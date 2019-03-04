/* global describe, it */

describe( 'OrthographicTrackballControls', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OrthographicTrackballControls'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OrthographicTrackballControls']() )

    } )

} )
