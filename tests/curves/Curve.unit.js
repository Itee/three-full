/* global describe, it */

describe( 'Curve', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Curve'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Curve']() )

    } )

} )
