//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LightShadow } from './LightShadow.js'
import { _Math } from '../math/Math.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
function SpotLightShadow() {

	LightShadow.call( this, new PerspectiveCamera( 50, 1, 0.5, 500 ) );

}

SpotLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

	constructor: SpotLightShadow,

	isSpotLightShadow: true,

	update: function ( light ) {

		var camera = this.camera;

		var fov = _Math.RAD2DEG * 2 * light.angle;
		var aspect = this.mapSize.width / this.mapSize.height;
		var far = light.distance || camera.far;

		if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far ) {

			camera.fov = fov;
			camera.aspect = aspect;
			camera.far = far;
			camera.updateProjectionMatrix();

		}

	}

} );

export { SpotLightShadow }
