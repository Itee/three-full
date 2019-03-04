/* global describe, it */

describe( 'Sprite', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Sprite'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Sprite']() )

    } )

} )
