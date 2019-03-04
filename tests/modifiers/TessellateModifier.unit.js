/* global describe, it */

describe( 'TessellateModifier', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TessellateModifier'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TessellateModifier']() )

    } )

} )
