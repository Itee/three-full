/* global describe, it */

describe( 'CSS3DRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CSS3DRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CSS3DRenderer']() )

    } )

} )
