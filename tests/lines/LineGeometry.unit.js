/* global describe, it */

describe( 'LineGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineGeometry']() )

    } )

} )
