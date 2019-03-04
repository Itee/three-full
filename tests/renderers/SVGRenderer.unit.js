/* global describe, it */

describe( 'SVGRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SVGRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SVGRenderer']() )

    } )

} )
