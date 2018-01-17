threejs-full-es6
================

[![License][license-badge]][license-badge-url]

#### Extended Three JavaScript 3D library ####

Three.js r89 come with lot of examples files, which are curently not usable as ES6 module. 
The purpose of this project is to convert all examples files and includes them as part 
of the library.

**The version 4.2.0 is now available !!!**

#### Setup ####

Assuming that npm and node are already installed.

Install:
````
npm install --save threejs-full-es6
````

#### Usage ####

Like Three.js but with more, more and more available stuff.

###### Using ES6: ######

````javascript
import { WhatIWant } from 'node_modules/threejs-full-es6/builds/Three.es.js'
// equivalent to
import { WhatIWant } from 'threejs-full-es6'
 
// or directly from sources folder
 
import { Ocean } from 'node_modules/threejs-full-es6/sources/Ocean'
````

###### Using Node/CommonJS: ######
````javascript
var Three = require('node_modules/threejs-full-es6/builds/Three.cjs.js')
````


###### Using AMD: ######

````javascript
require(['node_modules/threejs-full-es6/builds/Three.amd.js'], 
    function( Three ){
    
        //...
        
});
````

###### Using UMD: ######

````javascript
require(['node_modules/threejs-full-es6/builds/Three.amd.js'], 
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
        <script src="node_modules/threejs-full-es6/builds/Three.iife.js"></script>
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
* **Cloth.js** //*Use global variable from html example file !*

#### <a id="bug"></a>Bugs ####
- No known bug


#### Change log ####

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
