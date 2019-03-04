/* global describe, it */

describe( 'BoxHelper', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BoxHelper'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BoxHelper']() )

    } )

} )
