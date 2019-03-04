/* global describe, it */

describe( 'BrightnessContrastShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BrightnessContrastShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BrightnessContrastShader']() )

    } )

} )
