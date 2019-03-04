/* global describe, it */

describe( 'TetrahedronGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TetrahedronGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TetrahedronGeometry']() )

    } )

} )
