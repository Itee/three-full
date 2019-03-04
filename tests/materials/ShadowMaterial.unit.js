/* global describe, it */

describe( 'ShadowMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShadowMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShadowMaterial']() )

    } )

} )
