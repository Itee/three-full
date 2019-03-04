/* global describe, it */

describe( 'TextureCubeNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TextureCubeNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TextureCubeNode']() )

    } )

} )
