/* global describe, it */

describe( 'WebGLTextures', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLTextures'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLTextures']() )

    } )

} )
