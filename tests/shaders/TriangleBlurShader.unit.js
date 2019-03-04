/* global describe, it */

describe( 'TriangleBlurShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TriangleBlurShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TriangleBlurShader']() )

    } )

} )
