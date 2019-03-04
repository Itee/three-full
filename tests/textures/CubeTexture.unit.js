/* global describe, it */

describe( 'CubeTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubeTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubeTexture']() )

    } )

} )
