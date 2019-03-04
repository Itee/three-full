/* global describe, it */

describe( 'AdaptiveToneMappingPass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AdaptiveToneMappingPass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AdaptiveToneMappingPass']() )

    } )

} )
