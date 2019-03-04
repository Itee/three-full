/* global describe, it */

describe( 'DataTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DataTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DataTexture']() )

    } )

} )
