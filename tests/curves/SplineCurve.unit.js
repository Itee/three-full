/* global describe, it */

describe( 'SplineCurve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SplineCurve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SplineCurve']() )

    } )

} )
