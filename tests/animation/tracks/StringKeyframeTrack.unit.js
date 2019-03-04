/* global describe, it */

describe( 'StringKeyframeTrack', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StringKeyframeTrack'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StringKeyframeTrack']() )

    } )

} )
