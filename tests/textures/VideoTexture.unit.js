/* global describe, it */

describe( 'VideoTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VideoTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VideoTexture']() )

    } )

} )
