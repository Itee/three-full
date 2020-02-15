//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { OBJLoader2Parser } from '../OBJLoader2Parser.js'
import {
	WorkerRunner,
	DefaultWorkerPayloadHandler
} from '../WorkerRunner.js'

/**
 * @author Kai Salmen / https://kaisalmen.de
 * Development repository: https://github.com/kaisalmen/WWOBJLoader
 */
const OBJLoader2Worker = new WorkerRunner( new DefaultWorkerPayloadHandler( new OBJLoader2Parser() ) );

export { OBJLoader2Worker }
