/* global describe, it */

describe( 'HDRCubeTextureLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['HDRCubeTextureLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['HDRCubeTextureLoader']() )

    } )

} )
