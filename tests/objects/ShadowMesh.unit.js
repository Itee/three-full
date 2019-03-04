/* global describe, it */

describe( 'ShadowMesh', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShadowMesh'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShadowMesh']() )

    } )

} )
