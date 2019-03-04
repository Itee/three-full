/* global describe, it */

describe( 'MMDPhysics', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MMDPhysics'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MMDPhysics']() )

    } )

} )
