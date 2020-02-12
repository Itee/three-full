//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { SphericalHarmonics3 } from '../math/SphericalHarmonics3.js'
import { Light } from './Light.js'

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * A LightProbe is a source of indirect-diffuse light
 */
function LightProbe( sh, intensity ) {

	Light.call( this, undefined, intensity );

	this.sh = ( sh !== undefined ) ? sh : new SphericalHarmonics3();

}

LightProbe.prototype = Object.assign( Object.create( Light.prototype ), {

	constructor: LightProbe,

	isLightProbe: true,

	copy: function ( source ) {

		Light.prototype.copy.call( this, source );

		this.sh.copy( source.sh );
		this.intensity = source.intensity;

		return this;

	},

	toJSON: function ( meta ) {

		var data = Light.prototype.toJSON.call( this, meta );

		// data.sh = this.sh.toArray(); // todo

		return data;

	}

} );

export { LightProbe }
