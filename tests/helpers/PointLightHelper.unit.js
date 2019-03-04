/* global describe, it */

describe( 'PointLightHelper', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PointLightHelper'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PointLightHelper']() )

    } )

} )
