/* global describe, it */

describe( 'KeyframeTrack', () => {

    it( 'is bundlable', () => {

       should.exist( Three['KeyframeTrack'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['KeyframeTrack']() )

    } )

} )
