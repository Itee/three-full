//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Group } from '../objects/Group.js'
import { Mesh } from '../objects/Mesh.js'

/**
 * @author alteredq / http://alteredqualia.com/
 */
var SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new Group();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach: function ( child, parent, scene ) {

		console.warn( 'SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.' );

		scene.attach( child );

	},

	attach: function ( child, scene, parent ) {

		console.warn( 'SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.' );

		parent.attach( child );

	}

};

export { SceneUtils }
