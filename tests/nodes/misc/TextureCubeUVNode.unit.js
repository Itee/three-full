/* global describe, it */

describe( 'TextureCubeUVNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TextureCubeUVNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TextureCubeUVNode']() )

    } )

} )
