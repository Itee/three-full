/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @author sunag / http://www.sunag.com.br/
 * @thanks bhouston / https://clara.io/
 */

import { TempNode } from './TempNode.js'

var FunctionNode = function( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions ) {

	src = src || '';

	this.isMethod = typeof includesOrType !== "string";
	this.useKeywords = true;

	TempNode.call( this, this.isMethod ? null : includesOrType );

	if ( this.isMethod ) this.eval( src, includesOrType, extensionsOrIncludes, keywordsOrExtensions );
	else this.eval( src, extensionsOrIncludes, keywordsOrExtensions );

};

export { FunctionNode }
