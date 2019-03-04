/* global describe, it */

describe( 'DirectGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DirectGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DirectGeometry']() )

    } )

} )
