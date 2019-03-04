/* global describe, it */

describe( 'LuminosityHighPassShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LuminosityHighPassShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LuminosityHighPassShader']() )

    } )

} )
