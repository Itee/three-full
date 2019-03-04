/* global describe, it */

describe( 'ColorKeyframeTrack', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorKeyframeTrack'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorKeyframeTrack']() )

    } )

} )
