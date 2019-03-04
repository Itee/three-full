three-full
================

[![License][license-badge]][license-badge-url]

**The version 17.1.0 is now available under Three r0.102.0 !!!**

#### Extended Three JavaScript 3D library ####

Three.js come with lot of examples files, which are curently not usable as ES6 module. 
The purpose of this project is to convert all examples files and includes them as part 
of the library.

#### Setup ####

Assuming that npm and node are already installed.

Install:
````
npm install --save three-full
````

#### Usage ####

Like Three.js but with more, more and more available stuff.

###### Using ES6: ######

````javascript
import { WhatIWant } from 'node_modules/three-full/builds/Three.es.js'
// equivalent to
import { WhatIWant } from 'three-full'
 
// or directly from sources folder
 
import { Ocean } from 'node_modules/three-full/sources/Ocean'
````

###### Using Node/CommonJS: ######
````javascript
const Three = require('node_modules/three-full/builds/Three.cjs.js')
// equivalent to 
const Three = require('three-full')
````

###### Using UMD: ######

````javascript
const Three = require('node_modules/three-full/builds/Three.umd.js')
````

###### Using AMD: ######

````javascript
require(['node_modules/three-full/builds/Three.amd.js'], 
    function( Three ){
    
        //...
        
});
````

###### From HTML (not recommended): ######

````
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Three Full Es6</title>
    </head>
    <body>
        <script src="node_modules/three-full/builds/Three.iife.js"></script>
        <script>
            alert('Three.REVISION: ' + Three.REVISION)
        </script>
    </body>
</html>
````

Note: You should copy the file in right server location to serve it correctly, and use Three.iife.min.js under production ! Importing the all library in HTML page should be avoided, use a proper module bundler like webpack or rollup using es6 module syntaxe !


#### Commands ####
In case you want participate, you need to known some commands below:

Help:
````
npm run help
````
Will display all you need to known about available commands in three-full package

Patch:
````
npm run patch
````
<span style="color:red">**Important:** After installing/reinstalling node_modules/three you need to apply patch only once, for fix some examples parts.</span>

Convert:
````
npm run convert
````
This command will convert all examples files as ES6 modules ([*](#miss)) and copy all three files at top level of the package in view to be build.

Build:<br>
````
npm run build
````
This command will build converted sources as UMD, AMD, ES ([*](#bug)), CJS and IIFE using [Rollup](https://rollupjs.org/)

#### <a id="miss"></a>Missings Files ####

This is the list of unsupported part of example, which cannot/won't be converted.

* **Intermediary exporter files** 
    * **Curves.js**
    * **Geometries.js**
    * **Materials.js**
    
* **Workers** 
    * **RaytracingWorker.js**
    * **OffscreenCanvas.js**
    * **ctm folder**
    
* **Folders**
    * **draco** //*draco_decoder use Eval !*
    * **sea3d** //*Duplicate export 'SEA3D', namespace not managed yet*
    * **crossfade** //*Scene has already been declared*
    * **offscreen** //*Code that should be in HTML file example*
    * **ldraw**     //*Code that should run under nodejs*
        
* **Specific Files**   
    * **Cloth.js** //*Use global variable from html example file !*
    * **ParametricGeometries.js** //*Wrong export of TorusKnotCurve*
    * **OceanShaders.js** //*Need to check how to extends imported lib properly*
    * **RectAreaLightUniformsLib.js** //*Need to check how to extends imported lib properly*
    * **Volume.js** //*Use Eval !*
    * **NRRDLoader.js** //*Import Volume.js*
    * **XLoader.js** //*Unprocessable AMD module style*

#### <a id="miss"></a>Missings Imports ####

* **MMDLoader** Require MMDParser available at three/examples/js/libs/mmdparser.min.js
* **MMDExporter** Require MMDParser available at three/examples/js/libs/mmdparser.min.js
* **FBXLoader** Require Zlib.Inflate available at three/examples/js/libs/inflate.min.js
* **VTKLoader** Require Zlib.Inflate available at three/examples/js/libs/inflate.min.js
* **TTFLoader** Require opentype available at three/examples/js/libs/opentype.min.js
* **TimelinerController** Require Timeliner available at three/examples/js/libs/timeliner_gui.min.js

#### <a id="redirectedFiles"></a>Redirected Files ####

* AnimationClipCreator ---> 'animation/AnimationClipCreator.js'
* ArcCurve ---> 'curves/ArcCurve.js'
* BufferGeometryUtils ---> 'utils/BufferGeometryUtils.js'
* Car ---> 'objects/Car.js'
* CatmullRomCurve3 ---> 'curves/CatmullRomCurve3.js'
* ConvexObjectBreaker ---> 'modifiers/ConvexObjectBreaker.js'
* CubicBezierCurve ---> 'curves/CubicBezierCurve.js'
* CubicBezierCurve3 ---> 'curves/CubicBezierCurve3.js'
* Curve ---> 'curves/Curve.js'
* CurveExtras ---> 'curves/CurveExtras.js'
* CurvePath ---> 'core/CurvePath.js'
* Detector ---> 'helpers/Detector.js'
* Earcut ---> 'misc/Earcut.js'
* EllipseCurve ---> 'curves/EllipseCurve.js'
* Font ---> 'core/Font.js'
* GPUComputationRenderer ---> 'renderers/GPUComputationRenderer.js'
* GPUParticleSystem ---> 'objects/GPUParticleSystem.js'
* Gyroscope ---> 'objects/Gyroscope.js'
* ImmediateRenderObject ---> 'objects/ImmediateRenderObject.js'
* ImprovedNoise ---> 'misc/ImprovedNoise.js'
* Interpolation ---> 'core/Interpolation.js'
* LineCurve ---> 'curves/LineCurve.js'
* LineCurve3 ---> 'curves/LineCurve3.js'
* MarchingCubes ---> 'objects/MarchingCubes.js'
* MD2Character ---> 'objects/MD2Character.js'
* MD2CharacterComplex ---> 'objects/MD2CharacterComplex.js'
* MorphAnimMesh ---> 'objects/MorphAnimMesh.js'
* MorphBlendMesh ---> 'objects/MorphBlendMesh.js'
* Ocean ---> 'objects/Ocean.js'
* Octree ---> 'utils/Octree.js'
* Path ---> 'core/Path.js'
* PRNG ---> 'utils/PRNG.js'
* QuadraticBezierCurve ---> 'curves/QuadraticBezierCurve.js'
* QuadraticBezierCurve3 ---> 'curves/QuadraticBezierCurve3.js'
* QuickHull ---> 'utils/QuickHull.js'
* RollerCoaster ---> 'objects/RollerCoaster.js'
* ShaderGodRays ---> 'shaders/ShaderGodRays.js'
* ShaderSkin ---> 'shaders/ShaderSkin.js'
* ShaderTerrain ---> 'shaders/ShaderTerrain.js'
* ShaderToon ---> 'shaders/ShaderToon.js'
* ShaderTranslucent ---> 'shaders/ShaderTranslucent.js'
* Shape ---> 'core/Shape.js'
* ShapePath ---> 'core/ShapePath.js'
* ShapeUtils ---> 'utils/ShapeUtils.js'
* SimplexNoise ---> 'misc/SimplexNoise.js'
* SplineCurve ---> 'curves/SplineCurve.js'
* TimelinerController ---> 'animation/TimelinerController.js'
* TypedArrayUtils ---> 'utils/TypedArrayUtils.js'
* UCSCharacter ---> 'objects/UCSCharacter.js'
* VolumeSlice ---> 'audio/VolumeSlice.js'
* WebGL ---> 'helpers/WebGL.js'

All others folders under example file tree will be mapped to their counter-part under sources folders

#### <a id="bug"></a>Bugs ####
- No known bug


#### Change log ####


##### 17.1.0:

* Add unit tests about the usability of each Three class
* Add new npm script 'test' to run unit under karma server
* Add new gulp tasks to auto-generate unit tests
* Generate an HTML report after 'npm run test'

##### 17.0.0:

* Support of Three r102

##### 16.0.1:

* Fix missing core folder due to NPM v6.8.0 [bug](https://npm.community/t/npm-pack-leaving-out-files-6-8-0-only/5382)

##### 16.0.0:

* Support of Three r101
* Add patch in BufferGeometryUtils againt for...of loop

##### 15.0.0:

* Support of Three r100
* Ignore ldraw folder

##### 14.0.0:

* Support of Three r99
* Allow new glsl support

##### 13.0.0:

* Support of Three r98
* Some trouble could come from LoaderSupport using eval (/!\)
* Ignore offscreen folder

##### 12.0.0:

* Support of Three r97
* Add cleaning step before right source files ( Remove extra blank lines and semi-colons)
* Remove some useless patch about Nodes
* Use new WebGL lib instead of Detector

##### 11.3.3:

* Fix warning for cjs build onky in debug mode and improve window global check

##### 11.3.2:

* Fix global window declaration for cjs build usage (again)

##### 11.3.1:

* Fix global window declaration for cjs build usage

##### 11.3.0:

* Fix ObjLoader2 worker code
* Build tests under a gulp task
* Allow to lint tests files

##### 11.2.0:

* Add banner management over all sources files to avoid PR on sources that are converted

##### 11.1.1:

* Fix SkeletonUtils eslint bug using replacements edge case

##### 11.1.0:

* Sources files are now linted

##### 11.0.0:

* Support of Three r96
* Update edgecase replacement for LoaderSupport

##### 10.0.0:

* Support of Three r95
* Use a generator function that iterate over all files under sources and create the rollup config to build them separatly
* Fix missing LoaderUtils import in OBJLoader2
* Fix missing TextureCubeNode import in NodeBuilder
* Fix missing _Math import in Node
* Fix missing BufferGeometryUtils import in GLTFLoader
* Fix missing BokehDepthShader import in CinematicCamera
* Fix missing UniformsUtils and HalftoneShader import in HalftonePass
* Fix missing UniformsUtils and AfterimageShader import in AfterimagePass
* Fix missing Uint8BufferAttribute, Int8BufferAttribute, Int16BufferAttribute, Int32BufferAttribute and Float32BufferAttribute import in DRACOLoader
* Ignore Nodes and THREE.Nodes intermediary files
* Move ShaderTranslucent in shader folder

##### 9.0.0:

* Support of Three r94

##### 8.0.0:

* Support of Three r93

##### 7.0.0:

* Support of Three r92

##### 6.0.0:

* Support of Three r91
* Fix DefaultLoadingManager import in OBJLoader2
* Fix ShaderLib, UniformsLib, and UniformsUtils imports in LineMaterial
* Fix DefaultLoadingManager, Uint16BufferAttribute and Uint32BufferAttribute imports in DRACOLoader
* Remove fix-camera-node task due to threejs fix

##### 5.0.7:

* Fix missings PropertyBinding imports in FBXLoader
* Fix missings PropertyBinding imports in GLTFExporter
* Fix missings AnimationClip imports in MorphAnimMesh
* Fix missings AnimationClip imports in MD2Loader
* Fix missings _Math imports in SoftwareRenderer
* Fix missings CameraNode imports in NodeMaterialLoader
* Fix missings Interpolant imports in MMDLoader
* Remove unnecessary _Math imports

##### 5.0.6:

* Add a window global variable check to avoid crach under nodejs

##### 5.0.5:

* Change default entry for main and module in package

##### 5.0.4:

* Fix #18, OBJLoader2 worker code

##### 5.0.3:

* Fix missings Geometries imports in ObjectLoader
* Fix missings Materials imports in LoaderMaterial
* Fix missings Curves imports in CurvePath

##### 5.0.2 (Thanks to Marc Bartels):

* Fix missings Loader imports in GLTFLoader
* Fix invalid module.export stuff inside Detector

##### 5.0.1 :

* Reintroduce LineSegment fix

##### 5.0.0 :

* Support of Three r90
* Move the example folder tree to source */!\ In case you're using direct source import, please check the '([Redirected Files](#redirectedFiles))' part*
* Fix Math (instead of _Math) issue
* Fix missings imports/exports
* Reintroduce RollerCoaster stuff

##### 4.2.4 :

* Fix Line/LineSegments circular dependency 
( Be aware: Line constructor don't return LineSegments in case of wrong arguments, and log an error instead of a warning )

##### 4.2.3 :

* Fix Detector module.export code snippet

##### 4.2.2 :

* README.md fix wrong copy/paste

##### 4.2.1 :

* Ignore some dev files for npm

##### 4.2.0 :

* Change main entry point of package to Three.es.js

##### 4.1.1 :

* Fix NodeLib circular dependency with FunctionNode

##### 4.1.0 :

* Allow to build es module under production environment
* Fix node warning about unhandled promise rejection
* Fix rollup warning about indent option moved under output options
* Clean up sources

##### 4.0.0 :
    
* XLoader.js: is now ignored due to AMD module
* Add Earcut, Curves, EXRLoader, GCodeLoader, LoaderUtils
* Remove KeyframeTrackConstructor, KeyframeTrackPrototype, PathPrototype and ImageUtils
* Update imports statements


##### 3.0.0 :

* Cloth.js: is remove due to bad usage of global variable from his html example file
* Add two new fix for three package in CameraNode and NodeLib
* Fix almost all missings imports statements
* Note: 
   - MMDExporter and MMDLoader need external dependency from https://github.com/takahirox/mmd-parser
   - FBXLoader and VTKLoader need external dependency from https://github.com/imaya/zlib.js
   - TTFLoader need external dependency from https://github.com/nodebox/opentype.js


##### 2.2.0 :

* Add tests about every file to check their imports

##### 2.1.1 :

* Fix missing import statement in ShaderPass

##### 2.1.0 :

* Export and import statement support multilines

##### 2.0.0 :

* Support Three.js r88
* Reintroduce ColladaLoader in available modules
* Refactor the convert pipeline

[license-badge]: https://img.shields.io/npm/l/three.svg
[license-badge-url]: ./LICENSE.md
