/* global describe, it */

describe( 'PhongNodeMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PhongNodeMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PhongNodeMaterial']() )

    } )

} )
