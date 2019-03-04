/* global describe, it */

describe( 'MeshLambertMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshLambertMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshLambertMaterial']() )

    } )

} )
