/* global describe, it */

describe( 'SimplifyModifier', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SimplifyModifier'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SimplifyModifier']() )

    } )

} )
