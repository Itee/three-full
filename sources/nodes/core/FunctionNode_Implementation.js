//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { FunctionNode } from './FunctionNode_Declaration'
import { NodeLib } from './NodeLib.js'

// Fix circular dependency, see #2

FunctionNode.prototype.isShared = function( builder, output ) {

	return ! this.isMethod;

};

FunctionNode.prototype.getType = function( builder ) {

	return builder.getTypeByFormat( this.type );

};

FunctionNode.prototype.getInputByName = function( name ) {

	var i = this.inputs.length;

	while ( i -- ) {

		if ( this.inputs[ i ].name === name )
			return this.inputs[ i ];

	}

};

FunctionNode.prototype.getIncludeByName = function( name ) {

	var i = this.includes.length;

	while ( i -- ) {

		if ( this.includes[ i ].name === name )
			return this.includes[ i ];

	}

};

FunctionNode.prototype.generate = function( builder, output ) {

	var match, offset = 0, src = this.value;

	for ( var i = 0; i < this.includes.length; i ++ ) {

		builder.include( this.includes[ i ], this );

	}

	for ( var ext in this.extensions ) {

		builder.material.extensions[ ext ] = true;

	}

	while ( match = FunctionNode.rProperties.exec( this.value ) ) {

		var prop = match[ 0 ], isGlobal = this.isMethod ? ! this.getInputByName( prop ) : true;
		var reference = prop;

		if ( this.keywords[ prop ] || ( this.useKeywords && isGlobal && NodeLib.containsKeyword( prop ) ) ) {

			var node = this.keywords[ prop ];

			if ( ! node ) {

				var keyword = NodeLib.getKeywordData( prop );

				if ( keyword.cache ) node = builder.keywords[ prop ];

				node = node || NodeLib.getKeyword( prop, builder );

				if ( keyword.cache ) builder.keywords[ prop ] = node;

			}

			reference = node.build( builder );

		}

		if ( prop != reference ) {

			src = src.substring( 0, match.index + offset ) + reference + src.substring( match.index + prop.length + offset );

			offset += reference.length - prop.length;

		}

		if ( this.getIncludeByName( reference ) === undefined && NodeLib.contains( reference ) ) {

			builder.include( NodeLib.get( reference ) );

		}

	}

	if ( output === 'source' ) {

		return src;

	} else if ( this.isMethod ) {

		builder.include( this, false, src );

		return this.name;

	} else {

		return builder.format( "(" + src + ")", this.getType( builder ), output );

	}

};

export { FunctionNode }
