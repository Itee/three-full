/* global describe, it */

describe( 'LuminosityShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LuminosityShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LuminosityShader']() )

    } )

} )
