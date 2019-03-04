/* global describe, it */

describe( 'VarNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VarNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VarNode']() )

    } )

} )
