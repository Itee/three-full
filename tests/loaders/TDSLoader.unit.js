/* global describe, it */

describe( 'TDSLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TDSLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TDSLoader']() )

    } )

} )
