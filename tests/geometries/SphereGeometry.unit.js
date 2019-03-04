/* global describe, it */

describe( 'SphereGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SphereGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SphereGeometry']() )

    } )

} )
