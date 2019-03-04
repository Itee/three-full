/* global describe, it */

describe( 'MeshToonMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshToonMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshToonMaterial']() )

    } )

} )
