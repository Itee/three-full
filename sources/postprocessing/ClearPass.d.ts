//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	Color
} from '../../../src/Three';

import { Pass } from './Pass';

export class ClearPass extends Pass {

	constructor( clearColor?: Color | string | number, clearAlpha?: number );
	clearColor: Color | string | number;
	clearAlpha: number;

}
