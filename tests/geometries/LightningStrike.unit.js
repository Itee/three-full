/* global describe, it */

describe( 'LightningStrike', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LightningStrike'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LightningStrike']() )

    } )

} )
