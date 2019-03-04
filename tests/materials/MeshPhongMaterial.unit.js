/* global describe, it */

describe( 'MeshPhongMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshPhongMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshPhongMaterial']() )

    } )

} )
