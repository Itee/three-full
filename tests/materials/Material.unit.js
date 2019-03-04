/* global describe, it */

describe( 'Material', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Material'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Material']() )

    } )

} )
