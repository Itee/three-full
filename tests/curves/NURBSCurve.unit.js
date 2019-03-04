/* global describe, it */

describe( 'NURBSCurve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NURBSCurve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NURBSCurve']() )

    } )

} )
