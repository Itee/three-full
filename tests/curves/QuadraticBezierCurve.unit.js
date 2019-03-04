/* global describe, it */

describe( 'QuadraticBezierCurve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['QuadraticBezierCurve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['QuadraticBezierCurve']() )

    } )

} )
