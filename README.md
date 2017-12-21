threejs-full-es6
================

[![License][license-badge]][license-badge-url]

#### Extended Three JavaScript 3D library ####

Three.js come with lot of examples files, which are curently not usable as ES6 module. 
The purpose of this project is to convert all examples files and includes them as part 
of the library.

**The version 2.1.1 is now available !!!**

#### Setup ####

Assuming that npm and node are already installed.

Install:
````
npm install --save threejs-full-es6
````

#### Usage ####

Like Three.js but with more, more and more available stuff

#### Commands ####
In case you want participate, you need to known some commands below:

Help:
````
npm run help
````
Will display all you need to known about available commands in threejs-full-es6 package

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

#### <a id="miss"></a>Missings ####

This is the list of unsupported part of example, which cannot be converted yet.
* **ctm folder** //*Need to check worker import*
* **draco folder** //*draco_decoder use Eval !*
* **sea3d folder** //*Duplicate export 'SEA3D', namespace not managed yet*
* **crossfade folder** //*Scene has already been declared*
* **RaytracingWorker.js** //*Need to check worker import*
* **ParametricGeometries.js** //*Bug TorusKnotCurve from es6-convertor*
* **RollerCoaster.js** //*invalid default exports with file name from es6-convertor*
* **OceanShaders.js** //*Need to check how to extends imported lib properly*
* **RectAreaLightUniformsLib.js** //*...*
* **NRRDLoader.js** //*Import Volume.js*
* **Volume.js** //*Use Eval !*

#### <a id="bug"></a>Bugs ####
- Currently it is imposible to build ES module in production, due to an invalid characters that break uglify rollup plugin.


#### Change log ####

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
