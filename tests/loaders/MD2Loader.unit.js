/* global describe, it */

describe( 'MD2Loader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MD2Loader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MD2Loader']() )

    } )

} )
