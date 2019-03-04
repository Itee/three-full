/* global describe, it */

describe( 'SVGLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SVGLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SVGLoader']() )

    } )

} )
