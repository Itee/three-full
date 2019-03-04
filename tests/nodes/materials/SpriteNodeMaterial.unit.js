/* global describe, it */

describe( 'SpriteNodeMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SpriteNodeMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SpriteNodeMaterial']() )

    } )

} )
