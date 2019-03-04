/* global describe, it */

describe( 'Raycaster', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Raycaster'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Raycaster']() )

    } )

} )
