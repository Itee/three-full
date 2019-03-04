/* global describe, it */

describe( 'CubeTextureLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubeTextureLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubeTextureLoader']() )

    } )

} )
