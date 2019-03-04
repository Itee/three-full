/* global describe, it */

describe( 'MeshMatcapMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshMatcapMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshMatcapMaterial']() )

    } )

} )
