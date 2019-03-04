/* global describe, it */

describe( 'PolyhedronGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PolyhedronGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PolyhedronGeometry']() )

    } )

} )
