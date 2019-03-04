/* global describe, it */

describe( 'MeshBasicMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshBasicMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshBasicMaterial']() )

    } )

} )
