/* global describe, it */

describe( 'EllipseCurve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['EllipseCurve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['EllipseCurve']() )

    } )

} )
