/* global describe, it */

describe( 'VerticalBlurShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VerticalBlurShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VerticalBlurShader']() )

    } )

} )
