/* global describe, it */

describe( 'Loader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Loader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Loader']() )

    } )

} )
