import { Vector3 } from '../math/Vector3.js'
import { Matrix3 } from '../math/Matrix3.js'
import { Geometry } from '../core/Geometry.js'
import { Mesh } from '../objects/Mesh.js'
import { BufferGeometry } from '../core/BufferGeometry.js'

/**
 * @author kovacsv / http://kovacsv.hu/
 * @author mrdoob / http://mrdoob.com/
 */

var STLExporter = function () {};

STLExporter.prototype = {

	constructor: STLExporter,

	parse: ( function () {

		var vector = new Vector3();
		var normalMatrixWorld = new Matrix3();

		return function parse( scene ) {

			var output = '';

			output += 'solid exported\n';

			scene.traverse( function ( object ) {

				if ( object instanceof Mesh ) {

					var geometry = object.geometry;
					var matrixWorld = object.matrixWorld;

					if ( geometry instanceof BufferGeometry ) {

						geometry = new Geometry().fromBufferGeometry( geometry );

					}

					if ( geometry instanceof Geometry ) {

						var vertices = geometry.vertices;
						var faces = geometry.faces;

						normalMatrixWorld.getNormalMatrix( matrixWorld );

						for ( var i = 0, l = faces.length; i < l; i ++ ) {

							var face = faces[ i ];

							vector.copy( face.normal ).applyMatrix3( normalMatrixWorld ).normalize();

							output += '\tfacet normal ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';
							output += '\t\touter loop\n';

							var indices = [ face.a, face.b, face.c ];

							for ( var j = 0; j < 3; j ++ ) {

								vector.copy( vertices[ indices[ j ] ] ).applyMatrix4( matrixWorld );

								output += '\t\t\tvertex ' + vector.x + ' ' + vector.y + ' ' + vector.z + '\n';

							}

							output += '\t\tendloop\n';
							output += '\tendfacet\n';

						}

					}

				}

			} );

			output += 'endsolid exported\n';

			return output;

		};

	}() )

};

export { STLExporter }
