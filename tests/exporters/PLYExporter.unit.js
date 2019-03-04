/* global describe, it */

describe( 'PLYExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PLYExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PLYExporter']() )

    } )

} )
