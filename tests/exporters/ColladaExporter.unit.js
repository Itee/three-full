/* global describe, it */

describe( 'ColladaExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColladaExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColladaExporter']() )

    } )

} )
