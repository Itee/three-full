/* global describe, it */

describe( 'WebGLRenderTargetCube', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLRenderTargetCube'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLRenderTargetCube']() )

    } )

} )
