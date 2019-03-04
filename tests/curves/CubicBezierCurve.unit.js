/* global describe, it */

describe( 'CubicBezierCurve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubicBezierCurve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubicBezierCurve']() )

    } )

} )
