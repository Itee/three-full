/* global describe, it */

describe( 'Math3Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Math3Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Math3Node']() )

    } )

} )
