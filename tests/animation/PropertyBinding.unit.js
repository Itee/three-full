/* global describe, it */

describe( 'PropertyBinding', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PropertyBinding'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PropertyBinding']() )

    } )

} )
