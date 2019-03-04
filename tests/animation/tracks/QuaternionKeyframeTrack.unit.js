/* global describe, it */

describe( 'QuaternionKeyframeTrack', () => {

    it( 'is bundlable', () => {

       should.exist( Three['QuaternionKeyframeTrack'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['QuaternionKeyframeTrack']() )

    } )

} )
