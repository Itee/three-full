//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LightShadow } from './LightShadow.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
/**
 * @author mrdoob / http://mrdoob.com/
 */

function DirectionalLightShadow() {

	LightShadow.call( this, new OrthographicCamera( - 5, 5, 5, - 5, 0.5, 500 ) );

}

DirectionalLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

	constructor: DirectionalLightShadow,

	isDirectionalLightShadow: true,

	updateMatrices: function ( light ) {

		LightShadow.prototype.updateMatrices.call( this, light );

	}

} );

export { DirectionalLightShadow }
