/* global describe, it */

describe( 'CubicInterpolant', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubicInterpolant'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubicInterpolant']() )

    } )

} )
