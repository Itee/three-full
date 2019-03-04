/* global describe, it */

describe( 'SepiaShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SepiaShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SepiaShader']() )

    } )

} )
