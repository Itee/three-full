/* global describe, it */

describe( 'LineBasicMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineBasicMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineBasicMaterial']() )

    } )

} )
