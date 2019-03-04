/* global describe, it */

describe( 'MeshStandardMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshStandardMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshStandardMaterial']() )

    } )

} )
