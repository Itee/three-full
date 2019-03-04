/* global describe, it */

describe( 'DataTexture3D', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DataTexture3D'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DataTexture3D']() )

    } )

} )
