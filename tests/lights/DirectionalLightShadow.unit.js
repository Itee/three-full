/* global describe, it */

describe( 'DirectionalLightShadow', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DirectionalLightShadow'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DirectionalLightShadow']() )

    } )

} )
