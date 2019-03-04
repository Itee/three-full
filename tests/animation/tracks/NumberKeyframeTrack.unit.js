/* global describe, it */

describe( 'NumberKeyframeTrack', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NumberKeyframeTrack'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NumberKeyframeTrack']() )

    } )

} )
