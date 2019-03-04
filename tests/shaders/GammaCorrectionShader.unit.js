/* global describe, it */

describe( 'GammaCorrectionShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GammaCorrectionShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GammaCorrectionShader']() )

    } )

} )
