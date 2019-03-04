/* global describe, it */

describe( 'StereoEffect', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StereoEffect'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StereoEffect']() )

    } )

} )
