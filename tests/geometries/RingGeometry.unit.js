/* global describe, it */

describe( 'RingGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RingGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RingGeometry']() )

    } )

} )
