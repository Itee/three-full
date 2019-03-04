/* global describe, it */

describe( 'StereoCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StereoCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StereoCamera']() )

    } )

} )
