/* global describe, it */

describe( 'PixelShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PixelShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PixelShader']() )

    } )

} )
