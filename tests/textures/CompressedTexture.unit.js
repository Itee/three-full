/* global describe, it */

describe( 'CompressedTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CompressedTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CompressedTexture']() )

    } )

} )
