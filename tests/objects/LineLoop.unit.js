/* global describe, it */

describe( 'LineLoop', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineLoop'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineLoop']() )

    } )

} )
