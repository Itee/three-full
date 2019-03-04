/* global describe, it */

describe( 'MeshDepthMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshDepthMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshDepthMaterial']() )

    } )

} )
