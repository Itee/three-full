/* global describe, it */

describe( 'TextureLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TextureLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TextureLoader']() )

    } )

} )
