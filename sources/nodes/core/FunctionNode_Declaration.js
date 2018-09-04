//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TempNode } from './TempNode.js'

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
FunctionNode.prototype.nodeType = "Function";

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
