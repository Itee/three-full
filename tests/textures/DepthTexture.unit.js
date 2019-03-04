/* global describe, it */

describe( 'DepthTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DepthTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DepthTexture']() )

    } )

} )
