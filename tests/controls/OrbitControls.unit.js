/* global describe, it */

describe( 'OrbitControls', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OrbitControls'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OrbitControls']() )

    } )

} )
