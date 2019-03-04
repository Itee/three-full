/* global describe, it */

describe( 'CubicBezierCurve3', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubicBezierCurve3'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubicBezierCurve3']() )

    } )

} )
