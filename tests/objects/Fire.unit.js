/* global describe, it */

describe( 'Fire', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Fire'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Fire']() )

    } )

} )
