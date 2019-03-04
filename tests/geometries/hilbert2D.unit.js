/* global describe, it */

describe( 'hilbert2D', () => {

    it( 'is bundlable', () => {

       should.exist( Three['hilbert2D'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['hilbert2D']() )

    } )

} )
