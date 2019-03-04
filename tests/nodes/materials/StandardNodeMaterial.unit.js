/* global describe, it */

describe( 'StandardNodeMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StandardNodeMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StandardNodeMaterial']() )

    } )

} )
