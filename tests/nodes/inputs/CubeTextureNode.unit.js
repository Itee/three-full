/* global describe, it */

describe( 'CubeTextureNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubeTextureNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubeTextureNode']() )

    } )

} )
