/* global describe, it */

describe( 'IntNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['IntNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['IntNode']() )

    } )

} )
