/* global describe, it */

describe( 'Math1Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Math1Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Math1Node']() )

    } )

} )
