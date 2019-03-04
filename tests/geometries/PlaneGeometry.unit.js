/* global describe, it */

describe( 'PlaneGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PlaneGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PlaneGeometry']() )

    } )

} )
