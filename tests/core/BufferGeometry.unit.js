/* global describe, it */

describe( 'BufferGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BufferGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BufferGeometry']() )

    } )

} )
