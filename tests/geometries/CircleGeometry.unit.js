/* global describe, it */

describe( 'CircleGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CircleGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CircleGeometry']() )

    } )

} )
