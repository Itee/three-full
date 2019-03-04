/* global describe, it */

describe( 'OperatorNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OperatorNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OperatorNode']() )

    } )

} )
