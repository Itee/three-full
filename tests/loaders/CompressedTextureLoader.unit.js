/* global describe, it */

describe( 'CompressedTextureLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CompressedTextureLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CompressedTextureLoader']() )

    } )

} )
