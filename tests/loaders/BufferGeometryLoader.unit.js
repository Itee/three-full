/* global describe, it */

describe( 'BufferGeometryLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BufferGeometryLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BufferGeometryLoader']() )

    } )

} )
