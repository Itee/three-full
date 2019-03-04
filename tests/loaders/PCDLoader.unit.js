/* global describe, it */

describe( 'PCDLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PCDLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PCDLoader']() )

    } )

} )
