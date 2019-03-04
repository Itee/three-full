/* global describe, it */

describe( 'UnpackDepthRGBAShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['UnpackDepthRGBAShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['UnpackDepthRGBAShader']() )

    } )

} )
