/* global describe, it */

describe( 'FunctionNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FunctionNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FunctionNode']() )

    } )

} )
