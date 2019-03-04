/* global describe, it */

describe( 'Points', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Points'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Points']() )

    } )

} )
