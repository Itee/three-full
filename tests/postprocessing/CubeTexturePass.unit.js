/* global describe, it */

describe( 'CubeTexturePass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubeTexturePass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubeTexturePass']() )

    } )

} )
