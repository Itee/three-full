/* global describe, it */

describe( 'Cylindrical', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Cylindrical'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Cylindrical']() )

    } )

} )
