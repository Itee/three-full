/* global describe, it */

describe( 'AssimpJSONLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AssimpJSONLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AssimpJSONLoader']() )

    } )

} )
