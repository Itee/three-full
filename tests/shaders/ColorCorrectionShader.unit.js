/* global describe, it */

describe( 'ColorCorrectionShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorCorrectionShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorCorrectionShader']() )

    } )

} )
