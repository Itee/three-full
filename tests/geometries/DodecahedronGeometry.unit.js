/* global describe, it */

describe( 'DodecahedronGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DodecahedronGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DodecahedronGeometry']() )

    } )

} )
