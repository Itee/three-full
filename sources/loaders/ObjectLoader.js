//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {
	UVMapping,
	CubeReflectionMapping,
	CubeRefractionMapping,
	EquirectangularReflectionMapping,
	EquirectangularRefractionMapping,
	SphericalReflectionMapping,
	CubeUVReflectionMapping,
	CubeUVRefractionMapping,
	RepeatWrapping,
	ClampToEdgeWrapping,
	MirroredRepeatWrapping,
	NearestFilter,
	NearestMipmapNearestFilter,
	NearestMipmapLinearFilter,
	LinearFilter,
	LinearMipmapNearestFilter,
	LinearMipmapLinearFilter
} from '../constants.js'
import { BufferAttribute } from '../core/BufferAttribute.js'
import { Color } from '../math/Color.js'
import { Object3D } from '../core/Object3D.js'
import { Group } from '../objects/Group.js'
import { InstancedMesh } from '../objects/InstancedMesh.js'
import { Sprite } from '../objects/Sprite.js'
import { Points } from '../objects/Points.js'
import { Line } from '../objects/Line.js'
import { LineLoop } from '../objects/LineLoop.js'
import { LineSegments } from '../objects/LineSegments.js'
import { LOD } from '../objects/LOD.js'
import { Mesh } from '../objects/Mesh.js'
import { SkinnedMesh } from '../objects/SkinnedMesh.js'
import { Shape } from '../core/Shape.js'
import { Fog } from '../scenes/Fog.js'
import { FogExp2 } from '../scenes/FogExp2.js'
import { HemisphereLight } from '../lights/HemisphereLight.js'
import { SpotLight } from '../lights/SpotLight.js'
import { PointLight } from '../lights/PointLight.js'
import { DirectionalLight } from '../lights/DirectionalLight.js'
import { AmbientLight } from '../lights/AmbientLight.js'
import { RectAreaLight } from '../lights/RectAreaLight.js'
import { OrthographicCamera } from '../cameras/OrthographicCamera.js'
import { PerspectiveCamera } from '../cameras/PerspectiveCamera.js'
import { Scene } from '../scenes/Scene.js'
import { CubeTexture } from '../textures/CubeTexture.js'
import { Texture } from '../textures/Texture.js'
import { ImageLoader } from './ImageLoader.js'
import { LoadingManager } from './LoadingManager.js'
import { AnimationClip } from '../animation/AnimationClip.js'
import { MaterialLoader } from './MaterialLoader.js'
import { LoaderUtils } from './LoaderUtils.js'
import { BufferGeometryLoader } from './BufferGeometryLoader.js'
import { Loader } from './Loader.js'
import { FileLoader } from './FileLoader.js'
import { WireframeGeometry } from '../geometries/WireframeGeometry.js'
import {
	TetrahedronGeometry,
	TetrahedronBufferGeometry
} from '../geometries/TetrahedronGeometry.js'
import {
	OctahedronGeometry,
	OctahedronBufferGeometry
} from '../geometries/OctahedronGeometry.js'
import {
	IcosahedronGeometry,
	IcosahedronBufferGeometry
} from '../geometries/IcosahedronGeometry.js'
import {
	DodecahedronGeometry,
	DodecahedronBufferGeometry
} from '../geometries/DodecahedronGeometry.js'
import {
	PolyhedronGeometry,
	PolyhedronBufferGeometry
} from '../geometries/PolyhedronGeometry.js'
import {
	TubeGeometry,
	TubeBufferGeometry
} from '../geometries/TubeGeometry.js'
import { TorusKnotGeometry } from '../geometries/TorusKnotGeometry.js'
import {
	TorusGeometry,
	TorusBufferGeometry
} from '../geometries/TorusGeometry.js'
import {
	TextGeometry,
	TextBufferGeometry
} from '../geometries/TextGeometry.js'
import {
	SphereGeometry,
	SphereBufferGeometry
} from '../geometries/SphereGeometry.js'
import {
	RingGeometry,
	RingBufferGeometry
} from '../geometries/RingGeometry.js'
import {
	PlaneGeometry,
	PlaneBufferGeometry
} from '../geometries/PlaneGeometry.js'
import {
	LatheGeometry,
	LatheBufferGeometry
} from '../geometries/LatheGeometry.js'
import {
	ShapeGeometry,
	ShapeBufferGeometry
} from '../geometries/ShapeGeometry.js'
import {
	ExtrudeGeometry,
	ExtrudeBufferGeometry
} from '../geometries/ExtrudeGeometry.js'
import { EdgesGeometry } from '../geometries/EdgesGeometry.js'
import {
	ConeGeometry,
	ConeBufferGeometry
} from '../geometries/ConeGeometry.js'
import {
	CylinderGeometry,
	CylinderBufferGeometry
} from '../geometries/CylinderGeometry.js'
import {
	CircleGeometry,
	CircleBufferGeometry
} from '../geometries/CircleGeometry.js'
import {
	BoxGeometry,
	BoxBufferGeometry
} from '../geometries/BoxGeometry.js'
import { ArcCurve } from '../curves/ArcCurve.js'
import { CatmullRomCurve3 } from '../curves/CatmullRomCurve3.js'
import { CubicBezierCurve } from '../curves/CubicBezierCurve.js'
import { CubicBezierCurve3 } from '../curves/CubicBezierCurve3.js'
import { EllipseCurve } from '../curves/EllipseCurve.js'
import { LineCurve } from '../curves/LineCurve.js'
import { LineCurve3 } from '../curves/LineCurve3.js'
import { QuadraticBezierCurve } from '../curves/QuadraticBezierCurve.js'
import { QuadraticBezierCurve3 } from '../curves/QuadraticBezierCurve3.js'
import { SplineCurve } from '../curves/SplineCurve.js'
import {
	GrannyKnot,
	HeartCurve,
	VivianiCurve,
	KnotCurve,
	HelixCurve,
	TrefoilKnot,
	TorusKnot,
	CinquefoilKnot,
	TrefoilPolynomialKnot,
	FigureEightPolynomialKnot,
	DecoratedTorusKnot4a,
	DecoratedTorusKnot4b,
	DecoratedTorusKnot5a,
	DecoratedTorusKnot5c
} from '../curves/CurveExtras.js'
/**
 * @author mrdoob / http://mrdoob.com/
 */

var Geometries = {
    WireframeGeometry: WireframeGeometry,
    TetrahedronGeometry: TetrahedronGeometry,
    TetrahedronBufferGeometry: TetrahedronBufferGeometry,
    OctahedronGeometry: OctahedronGeometry,
    OctahedronBufferGeometry: OctahedronBufferGeometry,
    IcosahedronGeometry: IcosahedronGeometry,
    IcosahedronBufferGeometry: IcosahedronBufferGeometry,
    DodecahedronGeometry: DodecahedronGeometry,
    DodecahedronBufferGeometry: DodecahedronBufferGeometry,
    PolyhedronGeometry: PolyhedronGeometry,
    PolyhedronBufferGeometry: PolyhedronBufferGeometry,
    TubeGeometry: TubeGeometry,
    TubeBufferGeometry: TubeBufferGeometry,
    TorusKnotGeometry: TorusKnotGeometry,
    TorusGeometry: TorusGeometry,
    TorusBufferGeometry: TorusBufferGeometry,
    TextGeometry: TextGeometry,
    TextBufferGeometry: TextBufferGeometry,
    SphereGeometry: SphereGeometry,
    SphereBufferGeometry: SphereBufferGeometry,
    RingGeometry: RingGeometry,
    RingBufferGeometry: RingBufferGeometry,
    PlaneGeometry: PlaneGeometry,
    PlaneBufferGeometry: PlaneBufferGeometry,
    LatheGeometry: LatheGeometry,
    LatheBufferGeometry: LatheBufferGeometry,
    ShapeGeometry: ShapeGeometry,
    ShapeBufferGeometry: ShapeBufferGeometry,
    ExtrudeGeometry: ExtrudeGeometry,
    ExtrudeBufferGeometry: ExtrudeBufferGeometry,
    EdgesGeometry: EdgesGeometry,
    ConeGeometry: ConeGeometry,
    ConeBufferGeometry: ConeBufferGeometry,
    CylinderGeometry: CylinderGeometry,
    CylinderBufferGeometry: CylinderBufferGeometry,
    CircleGeometry: CircleGeometry,
    CircleBufferGeometry: CircleBufferGeometry,
    BoxGeometry: BoxGeometry,
    BoxBufferGeometry: BoxBufferGeometry
}
var Curves = {
	ArcCurve: ArcCurve,
	CatmullRomCurve3: CatmullRomCurve3,
	CubicBezierCurve: CubicBezierCurve,
	CubicBezierCurve3: CubicBezierCurve3,
	EllipseCurve: EllipseCurve,
	LineCurve: LineCurve,
	LineCurve3: LineCurve3,
	QuadraticBezierCurve: QuadraticBezierCurve,
	QuadraticBezierCurve3: QuadraticBezierCurve3,
	SplineCurve: SplineCurve,
	GrannyKnot: GrannyKnot,
	HeartCurve: HeartCurve,
	VivianiCurve: VivianiCurve,
	KnotCurve: KnotCurve,
	HelixCurve: HelixCurve,
	TrefoilKnot: TrefoilKnot,
	TorusKnot: TorusKnot,
	CinquefoilKnot: CinquefoilKnot,
	TrefoilPolynomialKnot: TrefoilPolynomialKnot,
	FigureEightPolynomialKnot: FigureEightPolynomialKnot,
	DecoratedTorusKnot4a: DecoratedTorusKnot4a,
	DecoratedTorusKnot4b: DecoratedTorusKnot4b,
	DecoratedTorusKnot5a: DecoratedTorusKnot5a,
	DecoratedTorusKnot5c: DecoratedTorusKnot5c,
}
function ObjectLoader( manager ) {

	Loader.call( this, manager );

}

ObjectLoader.prototype = Object.assign( Object.create( Loader.prototype ), {

	constructor: ObjectLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var path = ( this.path === '' ) ? LoaderUtils.extractUrlBase( url ) : this.path;
		this.resourcePath = this.resourcePath || path;

		var loader = new FileLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			var json = null;

			try {

				json = JSON.parse( text );

			} catch ( error ) {

				if ( onError !== undefined ) onError( error );

				console.error( 'THREE:ObjectLoader: Can\'t parse ' + url + '.', error.message );

				return;

			}

			var metadata = json.metadata;

			if ( metadata === undefined || metadata.type === undefined || metadata.type.toLowerCase() === 'geometry' ) {

				console.error( 'ObjectLoader: Can\'t load ' + url );
				return;

			}

			scope.parse( json, onLoad );

		}, onProgress, onError );

	},

	parse: function ( json, onLoad ) {

		var shapes = this.parseShape( json.shapes );
		var geometries = this.parseGeometries( json.geometries, shapes );

		var images = this.parseImages( json.images, function () {

			if ( onLoad !== undefined ) onLoad( object );

		} );

		var textures = this.parseTextures( json.textures, images );
		var materials = this.parseMaterials( json.materials, textures );

		var object = this.parseObject( json.object, geometries, materials );

		if ( json.animations ) {

			object.animations = this.parseAnimations( json.animations );

		}

		if ( json.images === undefined || json.images.length === 0 ) {

			if ( onLoad !== undefined ) onLoad( object );

		}

		return object;

	},

	parseShape: function ( json ) {

		var shapes = {};

		if ( json !== undefined ) {

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var shape = new Shape().fromJSON( json[ i ] );

				shapes[ shape.uuid ] = shape;

			}

		}

		return shapes;

	},

	parseGeometries: function ( json, shapes ) {

		var geometries = {};

		if ( json !== undefined ) {

			var bufferGeometryLoader = new BufferGeometryLoader();

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var geometry;
				var data = json[ i ];

				switch ( data.type ) {

					case 'PlaneGeometry':
					case 'PlaneBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.width,
							data.height,
							data.widthSegments,
							data.heightSegments
						);

						break;

					case 'BoxGeometry':
					case 'BoxBufferGeometry':
					case 'CubeGeometry': // backwards compatible

						geometry = new Geometries[ data.type ](
							data.width,
							data.height,
							data.depth,
							data.widthSegments,
							data.heightSegments,
							data.depthSegments
						);

						break;

					case 'CircleGeometry':
					case 'CircleBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.segments,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'CylinderGeometry':
					case 'CylinderBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radiusTop,
							data.radiusBottom,
							data.height,
							data.radialSegments,
							data.heightSegments,
							data.openEnded,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'ConeGeometry':
					case 'ConeBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.height,
							data.radialSegments,
							data.heightSegments,
							data.openEnded,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'SphereGeometry':
					case 'SphereBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.widthSegments,
							data.heightSegments,
							data.phiStart,
							data.phiLength,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'DodecahedronGeometry':
					case 'DodecahedronBufferGeometry':
					case 'IcosahedronGeometry':
					case 'IcosahedronBufferGeometry':
					case 'OctahedronGeometry':
					case 'OctahedronBufferGeometry':
					case 'TetrahedronGeometry':
					case 'TetrahedronBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.detail
						);

						break;

					case 'RingGeometry':
					case 'RingBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.innerRadius,
							data.outerRadius,
							data.thetaSegments,
							data.phiSegments,
							data.thetaStart,
							data.thetaLength
						);

						break;

					case 'TorusGeometry':
					case 'TorusBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.tube,
							data.radialSegments,
							data.tubularSegments,
							data.arc
						);

						break;

					case 'TorusKnotGeometry':
					case 'TorusKnotBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.radius,
							data.tube,
							data.tubularSegments,
							data.radialSegments,
							data.p,
							data.q
						);

						break;

					case 'TubeGeometry':
					case 'TubeBufferGeometry':

						// This only works for built-in curves (e.g. CatmullRomCurve3).
						// User defined curves or instances of CurvePath will not be deserialized.
						geometry = new Geometries[ data.type ](
							new Curves[ data.path.type ]().fromJSON( data.path ),
							data.tubularSegments,
							data.radius,
							data.radialSegments,
							data.closed
						);

						break;

					case 'LatheGeometry':
					case 'LatheBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.points,
							data.segments,
							data.phiStart,
							data.phiLength
						);

						break;

					case 'PolyhedronGeometry':
					case 'PolyhedronBufferGeometry':

						geometry = new Geometries[ data.type ](
							data.vertices,
							data.indices,
							data.radius,
							data.details
						);

						break;

					case 'ShapeGeometry':
					case 'ShapeBufferGeometry':

						var geometryShapes = [];

						for ( var j = 0, jl = data.shapes.length; j < jl; j ++ ) {

							var shape = shapes[ data.shapes[ j ] ];

							geometryShapes.push( shape );

						}

						geometry = new Geometries[ data.type ](
							geometryShapes,
							data.curveSegments
						);

						break;
					case 'ExtrudeGeometry':
					case 'ExtrudeBufferGeometry':

						var geometryShapes = [];

						for ( var j = 0, jl = data.shapes.length; j < jl; j ++ ) {

							var shape = shapes[ data.shapes[ j ] ];

							geometryShapes.push( shape );

						}

						var extrudePath = data.options.extrudePath;

						if ( extrudePath !== undefined ) {

							data.options.extrudePath = new Curves[ extrudePath.type ]().fromJSON( extrudePath );

						}

						geometry = new Geometries[ data.type ](
							geometryShapes,
							data.options
						);

						break;

					case 'BufferGeometry':
					case 'InstancedBufferGeometry':

						geometry = bufferGeometryLoader.parse( data );

						break;

					case 'Geometry':

						if ( 'THREE' in window && 'LegacyJSONLoader' in THREE ) {

							var geometryLoader = new LegacyJSONLoader();
							geometry = geometryLoader.parse( data, this.resourcePath ).geometry;
						} else {

							console.error( 'ObjectLoader: You have to import LegacyJSONLoader in order load geometry data of type "Geometry".' );

						}

						break;

					default:

						console.warn( 'ObjectLoader: Unsupported geometry type "' + data.type + '"' );

						continue;

				}

				geometry.uuid = data.uuid;

				if ( data.name !== undefined ) geometry.name = data.name;
				if ( geometry.isBufferGeometry === true && data.userData !== undefined ) geometry.userData = data.userData;

				geometries[ data.uuid ] = geometry;

			}

		}

		return geometries;

	},

	parseMaterials: function ( json, textures ) {

		var cache = {}; // MultiMaterial
		var materials = {};

		if ( json !== undefined ) {

			var loader = new MaterialLoader();
			loader.setTextures( textures );

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var data = json[ i ];

				if ( data.type === 'MultiMaterial' ) {

					// Deprecated

					var array = [];

					for ( var j = 0; j < data.materials.length; j ++ ) {

						var material = data.materials[ j ];

						if ( cache[ material.uuid ] === undefined ) {

							cache[ material.uuid ] = loader.parse( material );

						}

						array.push( cache[ material.uuid ] );

					}

					materials[ data.uuid ] = array;

				} else {

					if ( cache[ data.uuid ] === undefined ) {

						cache[ data.uuid ] = loader.parse( data );

					}

					materials[ data.uuid ] = cache[ data.uuid ];

				}

			}

		}

		return materials;

	},

	parseAnimations: function ( json ) {

		var animations = [];

		for ( var i = 0; i < json.length; i ++ ) {

			var data = json[ i ];

			var clip = AnimationClip.parse( data );

			if ( data.uuid !== undefined ) clip.uuid = data.uuid;

			animations.push( clip );

		}

		return animations;

	},

	parseImages: function ( json, onLoad ) {

		var scope = this;
		var images = {};

		function loadImage( url ) {

			scope.manager.itemStart( url );

			return loader.load( url, function () {

				scope.manager.itemEnd( url );

			}, undefined, function () {

				scope.manager.itemError( url );
				scope.manager.itemEnd( url );

			} );

		}

		if ( json !== undefined && json.length > 0 ) {

			var manager = new LoadingManager( onLoad );

			var loader = new ImageLoader( manager );
			loader.setCrossOrigin( this.crossOrigin );

			for ( var i = 0, il = json.length; i < il; i ++ ) {

				var image = json[ i ];
				var url = image.url;

				if ( Array.isArray( url ) ) {

					// load array of images e.g CubeTexture

					images[ image.uuid ] = [];

					for ( var j = 0, jl = url.length; j < jl; j ++ ) {

						var currentUrl = url[ j ];

						var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test( currentUrl ) ? currentUrl : scope.resourcePath + currentUrl;

						images[ image.uuid ].push( loadImage( path ) );

					}

				} else {

					// load single image

					var path = /^(\/\/)|([a-z]+:(\/\/)?)/i.test( image.url ) ? image.url : scope.resourcePath + image.url;

					images[ image.uuid ] = loadImage( path );

				}

			}

		}

		return images;

	},

	parseTextures: function ( json, images ) {

		function parseConstant( value, type ) {

			if ( typeof value === 'number' ) return value;

			console.warn( 'ObjectLoader.parseTexture: Constant should be in numeric form.', value );

			return type[ value ];

		}

		var textures = {};

		if ( json !== undefined ) {

			for ( var i = 0, l = json.length; i < l; i ++ ) {

				var data = json[ i ];

				if ( data.image === undefined ) {

					console.warn( 'ObjectLoader: No "image" specified for', data.uuid );

				}

				if ( images[ data.image ] === undefined ) {

					console.warn( 'ObjectLoader: Undefined image', data.image );

				}

				var texture;

				if ( Array.isArray( images[ data.image ] ) ) {

					texture = new CubeTexture( images[ data.image ] );

				} else {

					texture = new Texture( images[ data.image ] );

				}

				texture.needsUpdate = true;

				texture.uuid = data.uuid;

				if ( data.name !== undefined ) texture.name = data.name;

				if ( data.mapping !== undefined ) texture.mapping = parseConstant( data.mapping, TEXTURE_MAPPING );

				if ( data.offset !== undefined ) texture.offset.fromArray( data.offset );
				if ( data.repeat !== undefined ) texture.repeat.fromArray( data.repeat );
				if ( data.center !== undefined ) texture.center.fromArray( data.center );
				if ( data.rotation !== undefined ) texture.rotation = data.rotation;

				if ( data.wrap !== undefined ) {

					texture.wrapS = parseConstant( data.wrap[ 0 ], TEXTURE_WRAPPING );
					texture.wrapT = parseConstant( data.wrap[ 1 ], TEXTURE_WRAPPING );

				}

				if ( data.format !== undefined ) texture.format = data.format;
				if ( data.type !== undefined ) texture.type = data.type;
				if ( data.encoding !== undefined ) texture.encoding = data.encoding;

				if ( data.minFilter !== undefined ) texture.minFilter = parseConstant( data.minFilter, TEXTURE_FILTER );
				if ( data.magFilter !== undefined ) texture.magFilter = parseConstant( data.magFilter, TEXTURE_FILTER );
				if ( data.anisotropy !== undefined ) texture.anisotropy = data.anisotropy;

				if ( data.flipY !== undefined ) texture.flipY = data.flipY;

				if ( data.premultiplyAlpha !== undefined ) texture.premultiplyAlpha = data.premultiplyAlpha;
				if ( data.unpackAlignment !== undefined ) texture.unpackAlignment = data.unpackAlignment;

				textures[ data.uuid ] = texture;

			}

		}

		return textures;

	},

	parseObject: function ( data, geometries, materials ) {

		var object;

		function getGeometry( name ) {

			if ( geometries[ name ] === undefined ) {

				console.warn( 'ObjectLoader: Undefined geometry', name );

			}

			return geometries[ name ];

		}

		function getMaterial( name ) {

			if ( name === undefined ) return undefined;

			if ( Array.isArray( name ) ) {

				var array = [];

				for ( var i = 0, l = name.length; i < l; i ++ ) {

					var uuid = name[ i ];

					if ( materials[ uuid ] === undefined ) {

						console.warn( 'ObjectLoader: Undefined material', uuid );

					}

					array.push( materials[ uuid ] );

				}

				return array;

			}

			if ( materials[ name ] === undefined ) {

				console.warn( 'ObjectLoader: Undefined material', name );

			}

			return materials[ name ];

		}

		switch ( data.type ) {

			case 'Scene':

				object = new Scene();

				if ( data.background !== undefined ) {

					if ( Number.isInteger( data.background ) ) {

						object.background = new Color( data.background );

					}

				}

				if ( data.fog !== undefined ) {

					if ( data.fog.type === 'Fog' ) {

						object.fog = new Fog( data.fog.color, data.fog.near, data.fog.far );

					} else if ( data.fog.type === 'FogExp2' ) {

						object.fog = new FogExp2( data.fog.color, data.fog.density );

					}

				}

				break;

			case 'PerspectiveCamera':

				object = new PerspectiveCamera( data.fov, data.aspect, data.near, data.far );

				if ( data.focus !== undefined ) object.focus = data.focus;
				if ( data.zoom !== undefined ) object.zoom = data.zoom;
				if ( data.filmGauge !== undefined ) object.filmGauge = data.filmGauge;
				if ( data.filmOffset !== undefined ) object.filmOffset = data.filmOffset;
				if ( data.view !== undefined ) object.view = Object.assign( {}, data.view );

				break;

			case 'OrthographicCamera':

				object = new OrthographicCamera( data.left, data.right, data.top, data.bottom, data.near, data.far );

				if ( data.zoom !== undefined ) object.zoom = data.zoom;
				if ( data.view !== undefined ) object.view = Object.assign( {}, data.view );

				break;

			case 'AmbientLight':

				object = new AmbientLight( data.color, data.intensity );

				break;

			case 'DirectionalLight':

				object = new DirectionalLight( data.color, data.intensity );

				break;

			case 'PointLight':

				object = new PointLight( data.color, data.intensity, data.distance, data.decay );

				break;

			case 'RectAreaLight':

				object = new RectAreaLight( data.color, data.intensity, data.width, data.height );

				break;

			case 'SpotLight':

				object = new SpotLight( data.color, data.intensity, data.distance, data.angle, data.penumbra, data.decay );

				break;

			case 'HemisphereLight':

				object = new HemisphereLight( data.color, data.groundColor, data.intensity );

				break;

			case 'SkinnedMesh':

				console.warn( 'ObjectLoader.parseObject() does not support SkinnedMesh yet.' );

			case 'Mesh':

				var geometry = getGeometry( data.geometry );
				var material = getMaterial( data.material );

				if ( geometry.bones && geometry.bones.length > 0 ) {

					object = new SkinnedMesh( geometry, material );

				} else {

					object = new Mesh( geometry, material );

				}

				break;

			case 'InstancedMesh':

				var geometry = getGeometry( data.geometry );
				var material = getMaterial( data.material );
				var count = data.count;
				var instanceMatrix = data.instanceMatrix;

				object = new InstancedMesh( geometry, material, count );
				object.instanceMatrix = new BufferAttribute( new Float32Array( instanceMatrix.array ), 16 );

				break;

			case 'LOD':

				object = new LOD();

				break;

			case 'Line':

				object = new Line( getGeometry( data.geometry ), getMaterial( data.material ), data.mode );

				break;

			case 'LineLoop':

				object = new LineLoop( getGeometry( data.geometry ), getMaterial( data.material ) );

				break;

			case 'LineSegments':

				object = new LineSegments( getGeometry( data.geometry ), getMaterial( data.material ) );

				break;

			case 'PointCloud':
			case 'Points':

				object = new Points( getGeometry( data.geometry ), getMaterial( data.material ) );

				break;

			case 'Sprite':

				object = new Sprite( getMaterial( data.material ) );

				break;

			case 'Group':

				object = new Group();

				break;

			default:

				object = new Object3D();

		}

		object.uuid = data.uuid;

		if ( data.name !== undefined ) object.name = data.name;

		if ( data.matrix !== undefined ) {

			object.matrix.fromArray( data.matrix );

			if ( data.matrixAutoUpdate !== undefined ) object.matrixAutoUpdate = data.matrixAutoUpdate;
			if ( object.matrixAutoUpdate ) object.matrix.decompose( object.position, object.quaternion, object.scale );

		} else {

			if ( data.position !== undefined ) object.position.fromArray( data.position );
			if ( data.rotation !== undefined ) object.rotation.fromArray( data.rotation );
			if ( data.quaternion !== undefined ) object.quaternion.fromArray( data.quaternion );
			if ( data.scale !== undefined ) object.scale.fromArray( data.scale );

		}

		if ( data.castShadow !== undefined ) object.castShadow = data.castShadow;
		if ( data.receiveShadow !== undefined ) object.receiveShadow = data.receiveShadow;

		if ( data.shadow ) {

			if ( data.shadow.bias !== undefined ) object.shadow.bias = data.shadow.bias;
			if ( data.shadow.radius !== undefined ) object.shadow.radius = data.shadow.radius;
			if ( data.shadow.mapSize !== undefined ) object.shadow.mapSize.fromArray( data.shadow.mapSize );
			if ( data.shadow.camera !== undefined ) object.shadow.camera = this.parseObject( data.shadow.camera );

		}

		if ( data.visible !== undefined ) object.visible = data.visible;
		if ( data.frustumCulled !== undefined ) object.frustumCulled = data.frustumCulled;
		if ( data.renderOrder !== undefined ) object.renderOrder = data.renderOrder;
		if ( data.userData !== undefined ) object.userData = data.userData;
		if ( data.layers !== undefined ) object.layers.mask = data.layers;

		if ( data.children !== undefined ) {

			var children = data.children;

			for ( var i = 0; i < children.length; i ++ ) {

				object.add( this.parseObject( children[ i ], geometries, materials ) );

			}

		}

		if ( data.type === 'LOD' ) {

			if ( data.autoUpdate !== undefined ) object.autoUpdate = data.autoUpdate;

			var levels = data.levels;

			for ( var l = 0; l < levels.length; l ++ ) {

				var level = levels[ l ];
				var child = object.getObjectByProperty( 'uuid', level.object );

				if ( child !== undefined ) {

					object.addLevel( child, level.distance );

				}

			}

		}

		return object;

	}

} );

var TEXTURE_MAPPING = {
	UVMapping: UVMapping,
	CubeReflectionMapping: CubeReflectionMapping,
	CubeRefractionMapping: CubeRefractionMapping,
	EquirectangularReflectionMapping: EquirectangularReflectionMapping,
	EquirectangularRefractionMapping: EquirectangularRefractionMapping,
	SphericalReflectionMapping: SphericalReflectionMapping,
	CubeUVReflectionMapping: CubeUVReflectionMapping,
	CubeUVRefractionMapping: CubeUVRefractionMapping
};

var TEXTURE_WRAPPING = {
	RepeatWrapping: RepeatWrapping,
	ClampToEdgeWrapping: ClampToEdgeWrapping,
	MirroredRepeatWrapping: MirroredRepeatWrapping
};

var TEXTURE_FILTER = {
	NearestFilter: NearestFilter,
	NearestMipmapNearestFilter: NearestMipmapNearestFilter,
	NearestMipmapLinearFilter: NearestMipmapLinearFilter,
	LinearFilter: LinearFilter,
	LinearMipmapNearestFilter: LinearMipmapNearestFilter,
	LinearMipmapLinearFilter: LinearMipmapLinearFilter
};

export { ObjectLoader }
