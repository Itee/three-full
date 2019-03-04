/* global describe, it */

describe( 'MeshPhysicalMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshPhysicalMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshPhysicalMaterial']() )

    } )

} )
