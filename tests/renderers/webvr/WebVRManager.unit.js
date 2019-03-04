/* global describe, it */

describe( 'WebVRManager', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebVRManager'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebVRManager']() )

    } )

} )
