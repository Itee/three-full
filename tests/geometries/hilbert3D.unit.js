/* global describe, it */

describe( 'hilbert3D', () => {

    it( 'is bundlable', () => {

       should.exist( Three['hilbert3D'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['hilbert3D']() )

    } )

} )
