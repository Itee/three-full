/* global describe, it */

describe( 'AttributeNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AttributeNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AttributeNode']() )

    } )

} )
