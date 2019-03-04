/* global describe, it */

describe( 'PRNG', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PRNG'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PRNG']() )

    } )

} )
