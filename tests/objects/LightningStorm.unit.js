/* global describe, it */

describe( 'LightningStorm', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LightningStorm'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LightningStorm']() )

    } )

} )
