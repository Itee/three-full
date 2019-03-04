/* global describe, it */

describe( 'MeshDistanceMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshDistanceMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshDistanceMaterial']() )

    } )

} )
