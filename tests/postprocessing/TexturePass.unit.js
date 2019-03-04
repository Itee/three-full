/* global describe, it */

describe( 'TexturePass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TexturePass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TexturePass']() )

    } )

} )
