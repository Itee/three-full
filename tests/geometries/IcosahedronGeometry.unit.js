/* global describe, it */

describe( 'IcosahedronGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['IcosahedronGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['IcosahedronGeometry']() )

    } )

} )
