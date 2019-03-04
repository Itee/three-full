/* global describe, it */

describe( 'TextureNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TextureNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TextureNode']() )

    } )

} )
