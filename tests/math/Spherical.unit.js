/* global describe, it */

describe( 'Spherical', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Spherical'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Spherical']() )

    } )

} )
