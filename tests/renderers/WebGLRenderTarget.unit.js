/* global describe, it */

describe( 'WebGLRenderTarget', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLRenderTarget'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLRenderTarget']() )

    } )

} )
