/* global describe, it */

describe( 'OctahedronGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OctahedronGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OctahedronGeometry']() )

    } )

} )
