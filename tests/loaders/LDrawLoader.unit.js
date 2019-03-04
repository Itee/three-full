/* global describe, it */

describe( 'LDrawLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LDrawLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LDrawLoader']() )

    } )

} )
