/* global describe, it */

describe( 'RaytracingRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RaytracingRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RaytracingRenderer']() )

    } )

} )
