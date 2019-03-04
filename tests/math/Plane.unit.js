/* global describe, it */

describe( 'Plane', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Plane'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Plane']() )

    } )

} )
