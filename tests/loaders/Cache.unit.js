/* global describe, it */

describe( 'Cache', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Cache'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Cache']() )

    } )

} )
