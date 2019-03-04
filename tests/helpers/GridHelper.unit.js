/* global describe, it */

describe( 'GridHelper', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GridHelper'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GridHelper']() )

    } )

} )
