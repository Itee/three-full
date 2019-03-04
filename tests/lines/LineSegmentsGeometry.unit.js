/* global describe, it */

describe( 'LineSegmentsGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineSegmentsGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineSegmentsGeometry']() )

    } )

} )
