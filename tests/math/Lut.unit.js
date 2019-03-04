/* global describe, it */

describe( 'Lut', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Lut'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Lut']() )

    } )

} )
