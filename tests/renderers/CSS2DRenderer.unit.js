/* global describe, it */

describe( 'CSS2DRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CSS2DRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CSS2DRenderer']() )

    } )

} )
