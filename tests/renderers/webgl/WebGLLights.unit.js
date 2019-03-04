/* global describe, it */

describe( 'WebGLLights', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLLights'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLLights']() )

    } )

} )
