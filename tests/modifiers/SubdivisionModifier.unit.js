/* global describe, it */

describe( 'SubdivisionModifier', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SubdivisionModifier'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SubdivisionModifier']() )

    } )

} )
