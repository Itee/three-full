import { TempNode } from '../nodes/TempNode.js'

/**
 * @author sunag / http://www.sunag.com.br/
 * @thanks bhouston / https://clara.io/
 */

var FunctionNode = function( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions ) {

	src = src || '';

	this.isMethod = typeof includesOrType !== "string";
	this.useKeywords = true;

	TempNode.call( this, this.isMethod ? null : includesOrType );

	if ( this.isMethod ) this.eval( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions );
	else this.eval( src, extensionsOrIncludes, keywordsOrExtensions );

};

FunctionNode.rDeclaration = /^([a-z_0-9]+)\s([a-z_0-9]+)\s?\((.*?)\)/i;
FunctionNode.rProperties = /[a-z_0-9]+/ig;

FunctionNode.prototype = Object.create( TempNode.prototype );
FunctionNode.prototype.constructor = FunctionNode;

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

FunctionNode.prototype.eval = function( src, includes, extensions, keywords ) {

	src = ( src || '' ).trim();

	this.includes = includes || [];
	this.extensions = extensions || {};
	this.keywords = keywords || {};

	if ( this.isMethod ) {

		var match = src.match( FunctionNode.rDeclaration );

		this.inputs = [];

		if ( match && match.length == 4 ) {

			this.type = match[ 1 ];
			this.name = match[ 2 ];

			var inputs = match[ 3 ].match( FunctionNode.rProperties );

			if ( inputs ) {

				var i = 0;

				while ( i < inputs.length ) {

					var qualifier = inputs[ i ++ ];
					var type, name;

					if ( qualifier == 'in' || qualifier == 'out' || qualifier == 'inout' ) {

						type = inputs[ i ++ ];

					} else {

						type = qualifier;
						qualifier = '';

					}

					name = inputs[ i ++ ];

					this.inputs.push( {
						name : name,
						type : type,
						qualifier : qualifier
					} );

				}

			}

		} else {

			this.type = '';
			this.name = '';

		}

	}

	this.value = src;

};

export { FunctionNode }
