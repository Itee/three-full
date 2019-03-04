/* global describe, it */

describe( 'BabylonLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BabylonLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BabylonLoader']() )

    } )

} )
