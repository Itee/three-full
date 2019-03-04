/* global describe, it */

describe( 'PointsMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PointsMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PointsMaterial']() )

    } )

} )
