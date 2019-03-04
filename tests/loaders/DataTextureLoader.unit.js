/* global describe, it */

describe( 'DataTextureLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DataTextureLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DataTextureLoader']() )

    } )

} )
