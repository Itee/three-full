/* global describe, it */

describe( 'LineDashedMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LineDashedMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LineDashedMaterial']() )

    } )

} )
