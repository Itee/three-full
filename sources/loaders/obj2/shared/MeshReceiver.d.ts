//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Mesh
} from '../../../../../src/Three';

import { MaterialHandler } from './MaterialHandler';

export class MeshReceiver {

	constructor( materialHandler: MaterialHandler );
	logging: {
		enabled: boolean;
		debug: boolean;
	};
	callbacks: {
		onParseProgress: Function;
		onMeshAlter: Function;
	};
	materialHandler: MaterialHandler;

	buildMeshes( meshPayload: object ): Mesh[];
	setLogging( enabled: boolean, debug: boolean ): void;

}
