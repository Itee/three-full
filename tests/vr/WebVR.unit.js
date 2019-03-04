/* global describe, it */

describe( 'WebVR', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebVR'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebVR']() )

    } )

} )
