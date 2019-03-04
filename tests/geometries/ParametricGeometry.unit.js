/* global describe, it */

describe( 'ParametricGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ParametricGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ParametricGeometry']() )

    } )

} )
