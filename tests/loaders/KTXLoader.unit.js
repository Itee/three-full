/* global describe, it */

describe( 'KTXLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['KTXLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['KTXLoader']() )

    } )

} )
