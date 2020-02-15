//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ObjectManipulator {

	constructor();

	applyProperties( objToAlter: object, params: object, forceCreation: boolean ): void;

}

export class DefaultWorkerPayloadHandler {

	constructor( parser: object );
	logging: {
		enabled: boolean;
		debug: boolean;
	};
	parser: object;

	handlePayload( payload: object ): void;

}

export class WorkerRunner {

	constructor( payloadHandler: object );
	payloadHandler: object;

	processMessage( payload: object ): void;

}
