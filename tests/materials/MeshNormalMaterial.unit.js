/* global describe, it */

describe( 'MeshNormalMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshNormalMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshNormalMaterial']() )

    } )

} )
