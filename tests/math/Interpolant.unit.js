/* global describe, it */

describe( 'Interpolant', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Interpolant'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Interpolant']() )

    } )

} )
