//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class PropertyMixer {

	constructor( binding: any, typeName: string, valueSize: number );

	binding: any;
	valueSize: number;
	buffer: any;
	cumulativeWeight: number;
	useCount: number;
	referenceCount: number;

	accumulate( accuIndex: number, weight: number ): void;
	apply( accuIndex: number ): void;
	saveOriginalState(): void;
	restoreOriginalState(): void;

}
