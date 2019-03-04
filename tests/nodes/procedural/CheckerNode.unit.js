/* global describe, it */

describe( 'CheckerNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CheckerNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CheckerNode']() )

    } )

} )
