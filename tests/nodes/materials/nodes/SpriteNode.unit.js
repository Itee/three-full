/* global describe, it */

describe( 'SpriteNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SpriteNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SpriteNode']() )

    } )

} )
