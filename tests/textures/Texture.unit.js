/* global describe, it */

describe( 'Texture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Texture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Texture']() )

    } )

} )
