/* global describe, it */

describe( 'Geometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Geometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Geometry']() )

    } )

} )
