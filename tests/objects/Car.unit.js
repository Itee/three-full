/* global describe, it */

describe( 'Car', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Car'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Car']() )

    } )

} )
