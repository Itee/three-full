/* global describe, it */

describe( 'HorizontalBlurShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['HorizontalBlurShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['HorizontalBlurShader']() )

    } )

} )
