/* global describe, it */

describe( 'FunctionCallNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FunctionCallNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FunctionCallNode']() )

    } )

} )
