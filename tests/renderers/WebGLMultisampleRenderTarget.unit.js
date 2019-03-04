/* global describe, it */

describe( 'WebGLMultisampleRenderTarget', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLMultisampleRenderTarget'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLMultisampleRenderTarget']() )

    } )

} )
