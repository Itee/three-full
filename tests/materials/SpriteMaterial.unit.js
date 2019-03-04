/* global describe, it */

describe( 'SpriteMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SpriteMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SpriteMaterial']() )

    } )

} )
