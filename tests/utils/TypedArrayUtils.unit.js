/* global describe, it */

describe( 'TypedArrayUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TypedArrayUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TypedArrayUtils']() )

    } )

} )
