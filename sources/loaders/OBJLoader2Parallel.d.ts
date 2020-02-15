//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	LoadingManager
} from '../../../src/Three';
import { OBJLoader2 } from './OBJLoader2';

import { WorkerExecutionSupport } from './obj2/worker/main/WorkerExecutionSupport';

export class OBJLoader2Parallel extends OBJLoader2 {

	constructor( manager?: LoadingManager );
	preferJsmWorker: boolean;
	executeParallel: boolean;
	workerExecutionSupport: WorkerExecutionSupport;

	setPreferJsmWorker( preferJsmWorker: boolean ): this;
	setExecuteParallel( executeParallel: boolean ): this;
	getWorkerExecutionSupport(): object;
	buildWorkerCode(): object;
	parse( content: ArrayBuffer ): void;

}
