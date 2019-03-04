/* global describe, it */

describe( 'DirectionalLightHelper', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DirectionalLightHelper'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DirectionalLightHelper']() )

    } )

} )
