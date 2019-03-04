/* global describe, it */

describe( 'LatheGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LatheGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LatheGeometry']() )

    } )

} )
