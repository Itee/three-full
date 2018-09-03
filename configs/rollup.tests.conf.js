/**
 * @file Todo
 *
 * @author Itee <valcketristan@gmail.com>
 * @license MIT
 */

function glsl() {

	return {

		transform( code, id ) {

			if ( /\.glsl$/.test( id ) === false ) return;

			var transformedCode = 'export default ' + JSON.stringify(
				code
					.replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
					.replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
					.replace( /\n{2,}/g, '\n' ) // # \n+ to \n
			) + ';';
			return {
				code: transformedCode,
				map: { mappings: '' }
			};

		}

	};

}

export default [

	//root

	// animation
	{
		input: 'sources/animation/AnimationAction.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/AnimationAction.test.js'
		}
	},
	{
		input: 'sources/animation/AnimationClip.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/AnimationClip.test.js'
		}
	},
    {
        input: 'sources/animation/AnimationClipCreator.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/animation/AnimationClipCreator.test.js'
        }
    },
	{
		input: 'sources/animation/AnimationMixer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/AnimationMixer.test.js'
		}
	},
	{
		input: 'sources/animation/AnimationObjectGroup.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/AnimationObjectGroup.test.js'
		}
	},
	{
		input: 'sources/animation/AnimationUtils.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/AnimationUtils.test.js'
		}
	},
	{
		input: 'sources/animation/CCDIKSolver.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/CCDIKSolver.test.js'
		}
	},
	{
		input: 'sources/animation/KeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/KeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/MMDPhysics.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/MMDPhysics.test.js'
		}
	},
	{
		input: 'sources/animation/PropertyBinding.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/PropertyBinding.test.js'
		}
	},
	{
		input: 'sources/animation/PropertyMixer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/PropertyMixer.test.js'
		}
	},
    {
        input: 'sources/animation/TimelinerController.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/animation/TimelinerController.test.js'
        }
    },
	// animation/tracks

	{
		input: 'sources/animation/tracks/BooleanKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/BooleanKeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/tracks/ColorKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/ColorKeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/tracks/NumberKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/NumberKeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/tracks/QuaternionKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/QuaternionKeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/tracks/StringKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/StringKeyframeTrack.test.js'
		}
	},
	{
		input: 'sources/animation/tracks/VectorKeyframeTrack.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/animation/tracks/VectorKeyframeTrack.test.js'
		}
	},

	// audio
	{
		input: 'sources/audio/Audio.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/audio/Audio.test.js'
		}
	},
	{
		input: 'sources/audio/AudioAnalyser.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/audio/AudioAnalyser.test.js'
		}
	},
	{
		input: 'sources/audio/AudioContext.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/audio/AudioContext.test.js'
		}
	},
	{
		input: 'sources/audio/AudioListener.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/audio/AudioListener.test.js'
		}
	},
	{
		input: 'sources/audio/PositionalAudio.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/audio/PositionalAudio.test.js'
		}
	},
    {
        input: 'sources/audio/VolumeSlice.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/audio/VolumeSlice.test.js'
        }
    },

	// cameras
	{
		input: 'sources/cameras/ArrayCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/ArrayCamera.test.js'
		}
	},
	{
		input: 'sources/cameras/Camera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/Camera.test.js'
		}
	},
	{
		input: 'sources/cameras/CinematicCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/CinematicCamera.test.js'
		}
	},
	{
		input: 'sources/cameras/CubeCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/CubeCamera.test.js'
		}
	},
	{
		input: 'sources/cameras/OrthographicCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/OrthographicCamera.test.js'
		}
	},
	{
		input: 'sources/cameras/PerspectiveCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/PerspectiveCamera.test.js'
		}
	},
	{
		input: 'sources/cameras/StereoCamera.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/cameras/StereoCamera.test.js'
		}
	},

	// controls
	{
		input: 'sources/controls/DeviceOrientationControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/DeviceOrientationControls.test.js'
		}
	},
	{
		input: 'sources/controls/DragControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/DragControls.test.js'
		}
	},
	{
		input: 'sources/controls/EditorControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/EditorControls.test.js'
		}
	},
	{
		input: 'sources/controls/FirstPersonControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/FirstPersonControls.test.js'
		}
	},
	{
		input: 'sources/controls/FlyControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/FlyControls.test.js'
		}
	},
	{
		input: 'sources/controls/OrbitControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/OrbitControls.test.js'
		}
	},
	{
		input: 'sources/controls/OrthographicTrackballControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/OrthographicTrackballControls.test.js'
		}
	},
	{
		input: 'sources/controls/PointerLockControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/PointerLockControls.test.js'
		}
	},
	{
		input: 'sources/controls/TrackballControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/TrackballControls.test.js'
		}
	},
	{
		input: 'sources/controls/TransformControls.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/controls/TransformControls.test.js'
		}
	},

	// core
	{
		input: 'sources/core/BufferAttribute.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/BufferAttribute.test.js'
		}
	},
	{
		input: 'sources/core/BufferGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/BufferGeometry.test.js'
		}
	},
	{
		input: 'sources/core/Clock.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Clock.test.js'
		}
	},
	{
		input: 'sources/core/DirectGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/DirectGeometry.test.js'
		}
	},
	{
		input: 'sources/core/EventDispatcher.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/EventDispatcher.test.js'
		}
	},
	{
		input: 'sources/core/Face3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Face3.test.js'
		}
	},
	{
		input: 'sources/core/Geometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Geometry.test.js'
		}
	},
	{
		input: 'sources/core/InstancedBufferAttribute.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/InstancedBufferAttribute.test.js'
		}
	},
	{
		input: 'sources/core/InstancedBufferGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/InstancedBufferGeometry.test.js'
		}
	},
	{
		input: 'sources/core/InstancedInterleavedBuffer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/InstancedInterleavedBuffer.test.js'
		}
	},
	{
		input: 'sources/core/InterleavedBuffer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/InterleavedBuffer.test.js'
		}
	},
	{
		input: 'sources/core/InterleavedBufferAttribute.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/InterleavedBufferAttribute.test.js'
		}
	},
	{
		input: 'sources/core/Layers.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Layers.test.js'
		}
	},
	{
		input: 'sources/core/Object3D.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Object3D.test.js'
		}
	},
	{
		input: 'sources/core/Raycaster.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Raycaster.test.js'
		}
	},
	{
		input: 'sources/core/Uniform.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Uniform.test.js'
		}
	},

	// curves
    {
        input: 'sources/curves/Curve.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/curves/Curve.test.js'
        }
    },
	{
        input: 'sources/curves/CurveExtras.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/curves/CurveExtras.test.js'
        }
    },
    {
		input: 'sources/curves/NURBSCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/NURBSCurve.test.js'
		}
	},
	{
		input: 'sources/curves/NURBSSurface.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/NURBSSurface.test.js'
		}
	},
	{
		input: 'sources/curves/NURBSUtils.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/NURBSUtils.test.js'
		}
	},

	// effects
	{
		input: 'sources/effects/AnaglyphEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/AnaglyphEffect.test.js'
		}
	},
	{
		input: 'sources/effects/AsciiEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/AsciiEffect.test.js'
		}
	},
	{
		input: 'sources/effects/OutlineEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/OutlineEffect.test.js'
		}
	},
	{
		input: 'sources/effects/ParallaxBarrierEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/ParallaxBarrierEffect.test.js'
		}
	},
	{
		input: 'sources/effects/PeppersGhostEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/PeppersGhostEffect.test.js'
		}
	},
	{
		input: 'sources/effects/StereoEffect.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/effects/StereoEffect.test.js'
		}
	},

	// exporters
	{
		input: 'sources/exporters/GLTFExporter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/exporters/GLTFExporter.test.js'
		}
	},
	{
		input: 'sources/exporters/MMDExporter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/exporters/MMDExporter.test.js'
		}
	},
	{
		input: 'sources/exporters/OBJExporter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/exporters/OBJExporter.test.js'
		}
	},
	{
		input: 'sources/exporters/STLExporter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/exporters/STLExporter.test.js'
		}
	},
	{
		input: 'sources/exporters/TypedGeometryExporter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/exporters/TypedGeometryExporter.test.js'
		}
	},

	// extras
	{
		input: 'sources/misc/Earcut.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/misc/Earcut.test.js'
		}
	},
	{
		input: 'sources/utils/ShapeUtils.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/utils/ShapeUtils.test.js'
		}
	},
	// core
	{
		input: 'sources/core/CurvePath.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/CurvePath.test.js'
		}
	},
	{
		input: 'sources/core/Font.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Font.test.js'
		}
	},
	{
		input: 'sources/core/Interpolations.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Interpolations.test.js'
		}
	},
	{
		input: 'sources/core/Path.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Path.test.js'
		}
	},
	{
		input: 'sources/core/Shape.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/Shape.test.js'
		}
	},
	{
		input: 'sources/core/ShapePath.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/core/ShapePath.test.js'
		}
	},
	// curves
	{
		input: 'sources/curves/ArcCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/ArcCurve.test.js'
		}
	},
	{
		input: 'sources/curves/CatmullRomCurve3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/CatmullRomCurve3.test.js'
		}
	},
	{
		input: 'sources/curves/CubicBezierCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/CubicBezierCurve.test.js'
		}
	},
	{
		input: 'sources/curves/CubicBezierCurve3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/CubicBezierCurve3.test.js'
		}
	},
	{
		input: 'sources/curves/EllipseCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/EllipseCurve.test.js'
		}
	},
	{
		input: 'sources/curves/LineCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/LineCurve.test.js'
		}
	},
	{
		input: 'sources/curves/LineCurve3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/LineCurve3.test.js'
		}
	},
	{
		input: 'sources/curves/QuadraticBezierCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/QuadraticBezierCurve.test.js'
		}
	},
	{
		input: 'sources/curves/QuadraticBezierCurve3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/QuadraticBezierCurve3.test.js'
		}
	},
	{
		input: 'sources/curves/SplineCurve.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/curves/SplineCurve.test.js'
		}
	},
	// objects
	{
		input: 'sources/objects/ImmediateRenderObject.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/ImmediateRenderObject.test.js'
		}
	},

	// fonts ( unprocessable )

	// geometries
	{
		input: 'sources/geometries/BoxGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/BoxGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/CircleGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/CircleGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/ConeGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/ConeGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/ConvexGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/ConvexGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/CylinderGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/CylinderGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/DecalGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/DecalGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/DodecahedronGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/DodecahedronGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/EdgesGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/EdgesGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/ExtrudeGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/ExtrudeGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/hilbert2D.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/hilbert2D.test.js'
		}
	},
	{
		input: 'sources/geometries/hilbert3D.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/hilbert3D.test.js'
		}
	},
	{
		input: 'sources/geometries/IcosahedronGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/IcosahedronGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/LatheGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/LatheGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/OctahedronGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/OctahedronGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/ParametricGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/ParametricGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/PlaneGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/PlaneGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/PolyhedronGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/PolyhedronGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/RingGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/RingGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/ShapeGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/ShapeGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/SphereGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/SphereGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TeapotBufferGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TeapotBufferGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TetrahedronGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TetrahedronGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TextGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TextGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TorusGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TorusGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TorusKnotGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TorusKnotGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/TubeGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/TubeGeometry.test.js'
		}
	},
	{
		input: 'sources/geometries/WireframeGeometry.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/geometries/WireframeGeometry.test.js'
		}
	},

	// helpers
	{
		input: 'sources/helpers/ArrowHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/ArrowHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/AxesHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/AxesHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/Box3Helper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/Box3Helper.test.js'
		}
	},
	{
		input: 'sources/helpers/BoxHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/BoxHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/CameraHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/CameraHelper.test.js'
		}
	},
    {
        input: 'sources/helpers/Detector.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/helpers/Detector.test.js'
        }
    },
	{
		input: 'sources/helpers/DirectionalLightHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/DirectionalLightHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/FaceNormalsHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/FaceNormalsHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/GridHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/GridHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/HemisphereLightHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/HemisphereLightHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/PlaneHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/PlaneHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/PointLightHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/PointLightHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/PolarGridHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/PolarGridHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/RectAreaLightHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/RectAreaLightHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/SkeletonHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/SkeletonHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/SpotLightHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/SpotLightHelper.test.js'
		}
	},
	{
		input: 'sources/helpers/VertexNormalsHelper.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/helpers/VertexNormalsHelper.test.js'
		}
	},

	// lights
	{
		input: 'sources/lights/AmbientLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/AmbientLight.test.js'
		}
	},
	{
		input: 'sources/lights/DirectionalLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/DirectionalLight.test.js'
		}
	},
	{
		input: 'sources/lights/DirectionalLightShadow.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/DirectionalLightShadow.test.js'
		}
	},
	{
		input: 'sources/lights/HemisphereLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/HemisphereLight.test.js'
		}
	},
	{
		input: 'sources/lights/Light.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/Light.test.js'
		}
	},
	{
		input: 'sources/lights/LightShadow.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/LightShadow.test.js'
		}
	},
	{
		input: 'sources/lights/PointLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/PointLight.test.js'
		}
	},
	{
		input: 'sources/lights/RectAreaLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/RectAreaLight.test.js'
		}
	},
	{
		input: 'sources/lights/SpotLight.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/SpotLight.test.js'
		}
	},
	{
		input: 'sources/lights/SpotLightShadow.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/lights/SpotLightShadow.test.js'
		}
	},

	// loaders
	{
		input: 'sources/loaders/3MFLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/3MFLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AMFLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AMFLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AnimationLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AnimationLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AssimpJSONLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AssimpJSONLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AssimpLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AssimpLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AudioLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AudioLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/AWDLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/AWDLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/BabylonLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/BabylonLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/BinaryLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/BinaryLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/BufferGeometryLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/BufferGeometryLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/BVHLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/BVHLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/Cache.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/Cache.test.js'
		}
	},
	{
		input: 'sources/loaders/ColladaLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/ColladaLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/CompressedTextureLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/CompressedTextureLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/CubeTextureLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/CubeTextureLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/DataTextureLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/DataTextureLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/DDSLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/DDSLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/EXRLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/EXRLoader.test.js'
		}
	},
    {
        input: 'sources/loaders/FBXLoader.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/loaders/FBXLoader.test.js'
        }
    },
	{
		input: 'sources/loaders/FileLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/FileLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/FontLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/FontLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/GCodeLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/GCodeLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/GLTFLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/GLTFLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/HDRCubeTextureLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/HDRCubeTextureLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/ImageBitmapLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/ImageBitmapLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/ImageLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/ImageLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/JSONLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/JSONLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/KMZLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/KMZLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/KTXLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/KTXLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/Loader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/Loader.test.js'
		}
	},
	{
		input: 'sources/loaders/LoaderSupport.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/LoaderSupport.test.js'
		}
	},
	{
		input: 'sources/loaders/LoadingManager.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/LoadingManager.test.js'
		}
	},
	{
		input: 'sources/loaders/MaterialLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/MaterialLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/MD2Loader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/MD2Loader.test.js'
		}
	},
	{
		input: 'sources/loaders/MMDLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/MMDLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/MTLLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/MTLLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/NodeMaterialLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/NodeMaterialLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/ObjectLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/ObjectLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/OBJLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/OBJLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/OBJLoader2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/OBJLoader2.test.js'
		}
	},
	{
		input: 'sources/loaders/PCDLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PCDLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/PDBLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PDBLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/PlayCanvasLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PlayCanvasLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/PLYLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PLYLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/PRWMLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PRWMLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/PVRLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/PVRLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/RGBELoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/RGBELoader.test.js'
		}
	},
	{
		input: 'sources/loaders/STLLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/STLLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/SVGLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/SVGLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/TDSLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/TDSLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/TextureLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/TextureLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/TGALoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/TGALoader.test.js'
		}
	},
	{
		input: 'sources/loaders/TTFLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/TTFLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/VRMLLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/VRMLLoader.test.js'
		}
	},
	{
		input: 'sources/loaders/VTKLoader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/loaders/VTKLoader.test.js'
		}
	},
	//	{
	//		input: 'sources/loaders/XLoader.js',
	//		plugins: [ glsl() ],
	//		indent: '\t',
	//		output: {
	//			format: 'iife',
	//			name: 'Three',
	//			file: 'tests/loaders/XLoader.test.js'
	//		}
	//	},

	// materials
	{
		input: 'sources/materials/LineBasicMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/LineBasicMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/LineDashedMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/LineDashedMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/Material.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/Material.test.js'
		}
	},
	{
		input: 'sources/materials/MeshBasicMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshBasicMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshDepthMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshDepthMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshDistanceMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshDistanceMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshLambertMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshLambertMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshNormalMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshNormalMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshPhongMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshPhongMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshPhysicalMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshPhysicalMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshStandardMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshStandardMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/MeshToonMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/MeshToonMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/PointsMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/PointsMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/RawShaderMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/RawShaderMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/ShaderMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/ShaderMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/ShadowMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/ShadowMaterial.test.js'
		}
	},
	{
		input: 'sources/materials/SpriteMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/materials/SpriteMaterial.test.js'
		}
	},

	// math
	{
		input: 'sources/math/Box2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Box2.test.js'
		}
	},
	{
		input: 'sources/math/Box3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Box3.test.js'
		}
	},
	{
		input: 'sources/math/Color.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Color.test.js'
		}
	},
	{
		input: 'sources/math/ColorConverter.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/ColorConverter.test.js'
		}
	},
	{
		input: 'sources/math/Cylindrical.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Cylindrical.test.js'
		}
	},
	{
		input: 'sources/math/Euler.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Euler.test.js'
		}
	},
	{
		input: 'sources/math/Frustum.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Frustum.test.js'
		}
	},
	{
		input: 'sources/math/Interpolant.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Interpolant.test.js'
		}
	},
	{
		input: 'sources/math/Line3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Line3.test.js'
		}
	},
	{
		input: 'sources/math/Lut.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Lut.test.js'
		}
	},
	{
		input: 'sources/math/Math.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Math.test.js'
		}
	},
	{
		input: 'sources/math/Matrix3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Matrix3.test.js'
		}
	},
	{
		input: 'sources/math/Matrix4.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Matrix4.test.js'
		}
	},
	{
		input: 'sources/math/Plane.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Plane.test.js'
		}
	},
	{
		input: 'sources/math/Quaternion.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Quaternion.test.js'
		}
	},
	{
		input: 'sources/math/Ray.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Ray.test.js'
		}
	},
	{
		input: 'sources/math/Sphere.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Sphere.test.js'
		}
	},
	{
		input: 'sources/math/Spherical.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Spherical.test.js'
		}
	},
	{
		input: 'sources/math/Triangle.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Triangle.test.js'
		}
	},
	{
		input: 'sources/math/Vector2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Vector2.test.js'
		}
	},
	{
		input: 'sources/math/Vector3.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Vector3.test.js'
		}
	},
	{
		input: 'sources/math/Vector4.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/Vector4.test.js'
		}
	},
	//math/interpolants
	{
		input: 'sources/math/interpolants/CubicInterpolant.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/interpolants/CubicInterpolant.test.js'
		}
	},
	{
		input: 'sources/math/interpolants/DiscreteInterpolant.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/interpolants/DiscreteInterpolant.test.js'
		}
	},
	{
		input: 'sources/math/interpolants/LinearInterpolant.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/interpolants/LinearInterpolant.test.js'
		}
	},
	{
		input: 'sources/math/interpolants/QuaternionLinearInterpolant.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/math/interpolants/QuaternionLinearInterpolant.test.js'
		}
	},

	// misc
    {
        input: 'sources/misc/ImprovedNoise.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/misc/ImprovedNoise.test.js'
        }
    },
    {
        input: 'sources/misc/SimplexNoise.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/misc/SimplexNoise.test.js'
        }
    },

    // modifiers
	{
		input: 'sources/modifiers/BufferSubdivisionModifier.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/modifiers/BufferSubdivisionModifier.test.js'
		}
	},
    {
        input: 'sources/modifiers/ConvexObjectBreaker.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/modifiers/ConvexObjectBreaker.test.js'
        }
    },
    {
		input: 'sources/modifiers/ExplodeModifier.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/modifiers/ExplodeModifier.test.js'
		}
	},
	{
		input: 'sources/modifiers/SimplifyModifier.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/modifiers/SimplifyModifier.test.js'
		}
	},
	{
		input: 'sources/modifiers/SubdivisionModifier.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/modifiers/SubdivisionModifier.test.js'
		}
	},
	{
		input: 'sources/modifiers/TessellateModifier.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/modifiers/TessellateModifier.test.js'
		}
	},

	// nodes
	{
		input: 'sources/nodes/AttributeNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/AttributeNode.test.js'
		}
	},
	{
		input: 'sources/nodes/ConstNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/ConstNode.test.js'
		}
	},
	{
		input: 'sources/nodes/FunctionCallNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/FunctionCallNode.test.js'
		}
	},
	{
		input: 'sources/nodes/FunctionNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/FunctionNode.test.js'
		}
	},
	{
		input: 'sources/nodes/GLNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/GLNode.test.js'
		}
	},
	{
		input: 'sources/nodes/InputNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/InputNode.test.js'
		}
	},
	{
		input: 'sources/nodes/NodeBuilder.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/NodeBuilder.test.js'
		}
	},
	{
		input: 'sources/nodes/NodeFrame.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/NodeFrame.test.js'
		}
	},
	{
		input: 'sources/nodes/NodeLib.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/NodeLib.test.js'
		}
	},
	{
		input: 'sources/nodes/NodeMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/NodeMaterial.test.js'
		}
	},
	{
		input: 'sources/nodes/RawNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/RawNode.test.js'
		}
	},
	{
		input: 'sources/nodes/TempNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/TempNode.test.js'
		}
	},
	{
		input: 'sources/nodes/VarNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/VarNode.test.js'
		}
	},
	//nodes/accessors
	{
		input: 'sources/nodes/accessors/CameraNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/CameraNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/ColorsNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/ColorsNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/LightNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/LightNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/NormalNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/NormalNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/PositionNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/PositionNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/ReflectNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/ReflectNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/ScreenUVNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/ScreenUVNode.test.js'
		}
	},
	{
		input: 'sources/nodes/accessors/UVNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/accessors/UVNode.test.js'
		}
	},
	// nodes/inputs
	{
		input: 'sources/nodes/inputs/ColorNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/ColorNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/CubeTextureNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/CubeTextureNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/FloatNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/FloatNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/IntNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/IntNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/Matrix3Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/Matrix3Node.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/Matrix4Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/Matrix4Node.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/ReflectorNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/ReflectorNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/ScreenNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/ScreenNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/TextureNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/TextureNode.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/Vector2Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/Vector2Node.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/Vector3Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/Vector3Node.test.js'
		}
	},
	{
		input: 'sources/nodes/inputs/Vector4Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/inputs/Vector4Node.test.js'
		}
	},
	// nodes/materials
	{
		input: 'sources/nodes/materials/PhongNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/PhongNode.test.js'
		}
	},
	{
		input: 'sources/nodes/materials/PhongNodeMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/PhongNodeMaterial.test.js'
		}
	},
	{
		input: 'sources/nodes/materials/SpriteNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/SpriteNode.test.js'
		}
	},
	{
		input: 'sources/nodes/materials/SpriteNodeMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/SpriteNodeMaterial.test.js'
		}
	},
	{
		input: 'sources/nodes/materials/StandardNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/StandardNode.test.js'
		}
	},
	{
		input: 'sources/nodes/materials/StandardNodeMaterial.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/materials/StandardNodeMaterial.test.js'
		}
	},
	// nodes/math
	{
		input: 'sources/nodes/math/Math1Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/math/Math1Node.test.js'
		}
	},
	{
		input: 'sources/nodes/math/Math2Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/math/Math2Node.test.js'
		}
	},
	{
		input: 'sources/nodes/math/Math3Node.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/math/Math3Node.test.js'
		}
	},
	{
		input: 'sources/nodes/math/OperatorNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/math/OperatorNode.test.js'
		}
	},
	// nodes/postprocessing
	{
		input: 'sources/nodes/postprocessing/NodePass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/postprocessing/NodePass.test.js'
		}
	},
	// nodes/utils
	{
		input: 'sources/nodes/utils/BlurNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/BlurNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/BumpNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/BumpNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/ColorAdjustmentNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/ColorAdjustmentNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/JoinNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/JoinNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/LuminanceNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/LuminanceNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/NoiseNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/NoiseNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/NormalMapNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/NormalMapNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/ResolutionNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/ResolutionNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/RoughnessToBlinnExponentNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/RoughnessToBlinnExponentNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/SwitchNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/SwitchNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/TimerNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/TimerNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/UVTransformNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/UVTransformNode.test.js'
		}
	},
	{
		input: 'sources/nodes/utils/VelocityNode.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/nodes/utils/VelocityNode.test.js'
		}
	},

	// objects
    {
		input: 'sources/objects/Bone.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Bone.test.js'
		}
	},
    {
        input: 'sources/objects/Car.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/Car.test.js'
        }
    },
    {
        input: 'sources/objects/GPUParticleSystem.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/GPUParticleSystem.test.js'
        }
    },
    {
		input: 'sources/objects/Group.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Group.test.js'
		}
	},
    {
        input: 'sources/objects/Gyroscope.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/Gyroscope.test.js'
        }
    },
	{
		input: 'sources/objects/Lensflare.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Lensflare.test.js'
		}
	},
	{
		input: 'sources/objects/Line.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Line.test.js'
		}
	},
	{
		input: 'sources/objects/LineLoop.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/LineLoop.test.js'
		}
	},
	{
		input: 'sources/objects/LineSegments.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/LineSegments.test.js'
		}
	},
	{
		input: 'sources/objects/LOD.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/LOD.test.js'
		}
	},
    {
        input: 'sources/objects/MarchingCubes.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/MarchingCubes.test.js'
        }
    },
    {
        input: 'sources/objects/MD2Character.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/MD2Character.test.js'
        }
    },
    {
        input: 'sources/objects/MD2CharacterComplex.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/MD2CharacterComplex.test.js'
        }
    },
    {
		input: 'sources/objects/Mesh.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Mesh.test.js'
		}
	},
    {
        input: 'sources/objects/MorphAnimMesh.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/MorphAnimMesh.test.js'
        }
    },
    {
        input: 'sources/objects/MorphBlendMesh.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/MorphBlendMesh.test.js'
        }
    },
    {
        input: 'sources/objects/Ocean.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/Ocean.test.js'
        }
    },
    {
		input: 'sources/objects/Points.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Points.test.js'
		}
	},
	{
		input: 'sources/objects/Reflector.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Reflector.test.js'
		}
	},
	{
		input: 'sources/objects/ReflectorRTT.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/ReflectorRTT.test.js'
		}
	},
	{
		input: 'sources/objects/Refractor.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Refractor.test.js'
		}
	},
	{
		input: 'sources/objects/RollerCoaster.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/RollerCoaster.test.js'
		}
	},
	{
		input: 'sources/objects/ShadowMesh.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/ShadowMesh.test.js'
		}
	},
	{
		input: 'sources/objects/Skeleton.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Skeleton.test.js'
		}
	},
	{
		input: 'sources/objects/SkinnedMesh.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/SkinnedMesh.test.js'
		}
	},
	{
		input: 'sources/objects/Sky.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Sky.test.js'
		}
	},
	{
		input: 'sources/objects/Sprite.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Sprite.test.js'
		}
	},
    {
        input: 'sources/objects/UCSCharacter.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/objects/UCSCharacter.test.js'
        }
    },
	{
		input: 'sources/objects/Water.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Water.test.js'
		}
	},
	{
		input: 'sources/objects/Water2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Water2.test.js'
		}
	},
	{
		input: 'sources/objects/Water2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/objects/Water2.test.js'
		}
	},

    // pmrem
	{
		input: 'sources/pmrem/PMREMCubeUVPacker.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/pmrem/PMREMCubeUVPacker.test.js'
		}
	},
	{
		input: 'sources/pmrem/PMREMGenerator.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/pmrem/PMREMGenerator.test.js'
		}
	},

	// postprocessing
	{
		input: 'sources/postprocessing/AdaptiveToneMappingPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/AdaptiveToneMappingPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/BloomPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/BloomPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/BokehPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/BokehPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/ClearPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/ClearPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/CubeTexturePass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/CubeTexturePass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/DotScreenPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/DotScreenPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/EffectComposer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/EffectComposer.test.js'
		}
	},
	{
		input: 'sources/postprocessing/FilmPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/FilmPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/GlitchPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/GlitchPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/MaskPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/MaskPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/OutlinePass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/OutlinePass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/Pass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/Pass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/RenderPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/RenderPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/SAOPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/SAOPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/SavePass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/SavePass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/ShaderPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/ShaderPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/SMAAPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/SMAAPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/SSAARenderPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/SSAARenderPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/SSAOPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/SSAOPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/TAARenderPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/TAARenderPass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/TexturePass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/TexturePass.test.js'
		}
	},
	{
		input: 'sources/postprocessing/UnrealBloomPass.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/postprocessing/UnrealBloomPass.test.js'
		}
	},

	// renderers
	{
		input: 'sources/renderers/CanvasRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/CanvasRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/CSS2DRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/CSS2DRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/CSS3DRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/CSS3DRenderer.test.js'
		}
	},
    {
        input: 'sources/renderers/GPUComputationRenderer.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/renderers/GPUComputationRenderer.test.js'
        }
    },
	{
		input: 'sources/renderers/Projector.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/Projector.test.js'
		}
	},
	{
		input: 'sources/renderers/RaytracingRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/RaytracingRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/SoftwareRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/SoftwareRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/SVGRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/SVGRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/WebGL2Renderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/WebGL2Renderer.test.js'
		}
	},
	{
		input: 'sources/renderers/WebGLDeferredRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/WebGLDeferredRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/WebGLRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/WebGLRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/WebGLRenderTarget.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/WebGLRenderTarget.test.js'
		}
	},
	{
		input: 'sources/renderers/WebGLRenderTargetCube.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/WebGLRenderTargetCube.test.js'
		}
	},
	//renderers/shaders
	{
		input: 'sources/renderers/shaders/ShaderChunk.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/shaders/ShaderChunk.test.js'
		}
	},
	{
		input: 'sources/renderers/shaders/ShaderLib.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/shaders/ShaderLib.test.js'
		}
	},
	{
		input: 'sources/renderers/shaders/UniformsLib.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/shaders/UniformsLib.test.js'
		}
	},
	{
		input: 'sources/renderers/shaders/UniformsUtils.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/shaders/UniformsUtils.test.js'
		}
	},
	// renderers/webgl
	{
		input: 'sources/renderers/webgl/WebGLAttributes.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLAttributes.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLBackground.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLBackground.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLBufferRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLBufferRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLCapabilities.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLCapabilities.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLClipping.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLClipping.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLExtensions.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLExtensions.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLGeometries.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLGeometries.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLIndexedBufferRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLIndexedBufferRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLLights.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLLights.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLMorphtargets.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLMorphtargets.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLObjects.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLObjects.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLProgram.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLProgram.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLPrograms.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLPrograms.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLProperties.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLProperties.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLRenderLists.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLRenderLists.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLRenderStates.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLRenderStates.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLShader.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLShadowMap.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLShadowMap.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLSpriteRenderer.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLSpriteRenderer.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLState.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLState.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLTextures.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLTextures.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLUniforms.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLUniforms.test.js'
		}
	},
	{
		input: 'sources/renderers/webgl/WebGLUtils.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webgl/WebGLUtils.test.js'
		}
	},
	// renderers/webvr
	{
		input: 'sources/renderers/webvr/WebVRManager.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/renderers/webvr/WebVRManager.test.js'
		}
	},

	// scenes
	{
		input: 'sources/scenes/Fog.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/scenes/Fog.test.js'
		}
	},
	{
		input: 'sources/scenes/FogExp2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/scenes/FogExp2.test.js'
		}
	},
	{
		input: 'sources/scenes/Scene.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/scenes/Scene.test.js'
		}
	},

	// shaders
	{
		input: 'sources/shaders/BasicShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BasicShader.test.js'
		}
	},
	{
		input: 'sources/shaders/BleachBypassShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BleachBypassShader.test.js'
		}
	},
	{
		input: 'sources/shaders/BlendShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BlendShader.test.js'
		}
	},
	{
		input: 'sources/shaders/BokehShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BokehShader.test.js'
		}
	},
	{
		input: 'sources/shaders/BokehShader2.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BokehShader2.test.js'
		}
	},
	{
		input: 'sources/shaders/BrightnessContrastShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/BrightnessContrastShader.test.js'
		}
	},
	{
		input: 'sources/shaders/ColorCorrectionShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/ColorCorrectionShader.test.js'
		}
	},
	{
		input: 'sources/shaders/ColorifyShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/ColorifyShader.test.js'
		}
	},
	{
		input: 'sources/shaders/ConvolutionShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/ConvolutionShader.test.js'
		}
	},
	{
		input: 'sources/shaders/CopyShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/CopyShader.test.js'
		}
	},
	{
		input: 'sources/shaders/DepthLimitedBlurShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/DepthLimitedBlurShader.test.js'
		}
	},
	{
		input: 'sources/shaders/DigitalGlitch.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/DigitalGlitch.test.js'
		}
	},
	{
		input: 'sources/shaders/DOFMipMapShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/DOFMipMapShader.test.js'
		}
	},
	{
		input: 'sources/shaders/DotScreenShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/DotScreenShader.test.js'
		}
	},
	{
		input: 'sources/shaders/FilmShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/FilmShader.test.js'
		}
	},
	{
		input: 'sources/shaders/FocusShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/FocusShader.test.js'
		}
	},
	{
		input: 'sources/shaders/FreiChenShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/FreiChenShader.test.js'
		}
	},
	{
		input: 'sources/shaders/FresnelShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/FresnelShader.test.js'
		}
	},
	{
		input: 'sources/shaders/FXAAShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/FXAAShader.test.js'
		}
	},
	{
		input: 'sources/shaders/GammaCorrectionShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/GammaCorrectionShader.test.js'
		}
	},
	{
		input: 'sources/shaders/HorizontalBlurShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/HorizontalBlurShader.test.js'
		}
	},
	{
		input: 'sources/shaders/HorizontalTiltShiftShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/HorizontalTiltShiftShader.test.js'
		}
	},
	{
		input: 'sources/shaders/HueSaturationShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/HueSaturationShader.test.js'
		}
	},
	{
		input: 'sources/shaders/KaleidoShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/KaleidoShader.test.js'
		}
	},
	{
		input: 'sources/shaders/LuminosityHighPassShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/LuminosityHighPassShader.test.js'
		}
	},
	{
		input: 'sources/shaders/LuminosityShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/LuminosityShader.test.js'
		}
	},
	{
		input: 'sources/shaders/MirrorShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/MirrorShader.test.js'
		}
	},
	{
		input: 'sources/shaders/NormalMapShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/NormalMapShader.test.js'
		}
	},
	{
		input: 'sources/shaders/ParallaxShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/ParallaxShader.test.js'
		}
	},
	{
		input: 'sources/shaders/PixelShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/PixelShader.test.js'
		}
	},
	{
		input: 'sources/shaders/RGBShiftShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/RGBShiftShader.test.js'
		}
	},
	{
		input: 'sources/shaders/SAOShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/SAOShader.test.js'
		}
	},
	{
		input: 'sources/shaders/SepiaShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/SepiaShader.test.js'
		}
	},
    {
        input: 'sources/shaders/ShaderGodRays.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/shaders/ShaderGodRays.test.js'
        }
    },
    {
        input: 'sources/shaders/ShaderSkin.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/shaders/ShaderSkin.test.js'
        }
    },
    {
        input: 'sources/shaders/ShaderTerrain.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/shaders/ShaderTerrain.test.js'
        }
    },
    {
        input: 'sources/shaders/ShaderToon.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/shaders/ShaderToon.test.js'
        }
    },
	{
		input: 'sources/shaders/SMAAShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/SMAAShader.test.js'
		}
	},
	{
		input: 'sources/shaders/SobelOperatorShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/SobelOperatorShader.test.js'
		}
	},
	{
		input: 'sources/shaders/SSAOShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/SSAOShader.test.js'
		}
	},
	{
		input: 'sources/shaders/TechnicolorShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/TechnicolorShader.test.js'
		}
	},
	{
		input: 'sources/shaders/ToneMapShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/ToneMapShader.test.js'
		}
	},
	{
		input: 'sources/shaders/TriangleBlurShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/TriangleBlurShader.test.js'
		}
	},
	{
		input: 'sources/shaders/UnpackDepthRGBAShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/UnpackDepthRGBAShader.test.js'
		}
	},
	{
		input: 'sources/shaders/VerticalBlurShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/VerticalBlurShader.test.js'
		}
	},
	{
		input: 'sources/shaders/VerticalTiltShiftShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/VerticalTiltShiftShader.test.js'
		}
	},
	{
		input: 'sources/shaders/VignetteShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/VignetteShader.test.js'
		}
	},
	{
		input: 'sources/shaders/WaterRefractionShader.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/shaders/WaterRefractionShader.test.js'
		}
	},

	// textures
	{
		input: 'sources/textures/CanvasTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/CanvasTexture.test.js'
		}
	},
	{
		input: 'sources/textures/CompressedTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/CompressedTexture.test.js'
		}
	},
	{
		input: 'sources/textures/CubeTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/CubeTexture.test.js'
		}
	},
	{
		input: 'sources/textures/DataTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/DataTexture.test.js'
		}
	},
	{
		input: 'sources/textures/DepthTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/DepthTexture.test.js'
		}
	},
	{
		input: 'sources/textures/Texture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/Texture.test.js'
		}
	},
	{
		input: 'sources/textures/VideoTexture.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/textures/VideoTexture.test.js'
		}
	},

	// utils
    {
        input: 'sources/utils/BufferGeometryUtils.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/BufferGeometryUtils.test.js'
        }
    },
    {
        input: 'sources/utils/GeometryUtils.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/GeometryUtils.test.js'
        }
    },
    {
        input: 'sources/utils/Octree.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/Octree.test.js'
        }
    },
    {
        input: 'sources/utils/PRNG.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/PRNG.test.js'
        }
    },
    {
        input: 'sources/utils/QuickHull.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/QuickHull.test.js'
        }
    },
    {
        input: 'sources/utils/SceneUtils.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/SceneUtils.test.js'
        }
    },
    {
        input: 'sources/utils/ShadowMapViewer.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/ShadowMapViewer.test.js'
        }
    },
    {
        input: 'sources/utils/TypedArrayUtils.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/TypedArrayUtils.test.js'
        }
    },
    {
        input: 'sources/utils/UVsDebug.js',
        plugins: [ glsl() ],
        output: {
            indent: '\t',
            format: 'iife',
            name: 'Three',
            file: 'tests/utils/UVsDebug.test.js'
        }
    },

	// vr
	{
		input: 'sources/vr/DaydreamController.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/vr/DaydreamController.test.js'
		}
	},
	{
		input: 'sources/vr/GearVRController.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/vr/GearVRController.test.js'
		}
	},
	{
		input: 'sources/vr/PaintViveController.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/vr/PaintViveController.test.js'
		}
	},
	{
		input: 'sources/vr/ViveController.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/vr/ViveController.test.js'
		}
	},
	{
		input: 'sources/vr/WebVR.js',
		plugins: [ glsl() ],
		output: {
			indent: '\t',
			format: 'iife',
			name: 'Three',
			file: 'tests/vr/WebVR.test.js'
		}
	}

]
