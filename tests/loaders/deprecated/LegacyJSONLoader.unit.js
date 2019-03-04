/* global describe, it */

describe( 'LegacyJSONLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LegacyJSONLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LegacyJSONLoader']() )

    } )

} )
