/* global describe, it */

describe( 'QuaternionLinearInterpolant', () => {

    it( 'is bundlable', () => {

       should.exist( Three['QuaternionLinearInterpolant'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['QuaternionLinearInterpolant']() )

    } )

} )
