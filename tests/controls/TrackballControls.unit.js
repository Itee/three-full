/* global describe, it */

describe( 'TrackballControls', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TrackballControls'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TrackballControls']() )

    } )

} )
