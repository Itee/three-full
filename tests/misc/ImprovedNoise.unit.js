/* global describe, it */

describe( 'ImprovedNoise', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ImprovedNoise'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ImprovedNoise']() )

    } )

} )
