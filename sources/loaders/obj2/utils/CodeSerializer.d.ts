//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export namespace CodeSerializer {
	export function serializeObject( fullName: string, serializationTarget: object ): string;
	export function serializeClass( fullObjectName: string, serializationTarget: object, basePrototypeName?: string, overrideFunctions?: CodeSerializationInstruction[] ): string;
}

export class CodeSerializationInstruction {

	constructor( name: string, fullName: string );
	name: string;
	fullName: string;
	code: string;
	removeCode: boolean;

	getName(): string;
	getFullName(): string;
	setCode( code: string ): this;
	getCode(): string;
	setRemoveCode( removeCode: boolean ): this;
	isRemoveCode(): boolean;

}
