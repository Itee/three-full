/* global describe, it */

describe( 'ConeGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ConeGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ConeGeometry']() )

    } )

} )
