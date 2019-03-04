/* global describe, it */

describe( 'Fog', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Fog'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Fog']() )

    } )

} )
