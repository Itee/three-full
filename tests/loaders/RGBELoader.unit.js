/* global describe, it */

describe( 'RGBELoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RGBELoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RGBELoader']() )

    } )

} )
