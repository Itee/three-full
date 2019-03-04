/* global describe, it */

describe( 'RTTNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RTTNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RTTNode']() )

    } )

} )
