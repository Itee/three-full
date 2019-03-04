/* global describe, it */

describe( 'ColorAdjustmentNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorAdjustmentNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorAdjustmentNode']() )

    } )

} )
