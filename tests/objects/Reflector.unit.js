/* global describe, it */

describe( 'Reflector', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Reflector'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Reflector']() )

    } )

} )
