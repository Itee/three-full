/* global describe, it */

describe( 'MMDLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MMDLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MMDLoader']() )

    } )

} )
