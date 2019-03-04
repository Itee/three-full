/* global describe, it */

describe( 'LineMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineMaterial']() )

    } )

} )
