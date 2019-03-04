/* global describe, it */

describe( 'FirstPersonControls', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FirstPersonControls'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FirstPersonControls']() )

    } )

} )
