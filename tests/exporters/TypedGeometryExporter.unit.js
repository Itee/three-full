/* global describe, it */

describe( 'TypedGeometryExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TypedGeometryExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TypedGeometryExporter']() )

    } )

} )
