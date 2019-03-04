/* global describe, it */

describe( 'WebGLShadowMap', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLShadowMap'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLShadowMap']() )

    } )

} )
