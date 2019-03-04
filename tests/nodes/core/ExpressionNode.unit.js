/* global describe, it */

describe( 'ExpressionNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ExpressionNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ExpressionNode']() )

    } )

} )
