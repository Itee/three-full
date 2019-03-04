/* global describe, it */

describe( 'ConvexGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ConvexGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ConvexGeometry']() )

    } )

} )
