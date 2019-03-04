/* global describe, it */

describe( 'RollerCoaster', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RollerCoaster'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RollerCoaster']() )

    } )

} )
