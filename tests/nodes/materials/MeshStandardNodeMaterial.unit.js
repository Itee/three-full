/* global describe, it */

describe( 'MeshStandardNodeMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshStandardNodeMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshStandardNodeMaterial']() )

    } )

} )
