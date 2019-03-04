/* global describe, it */

describe( 'MMDExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MMDExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MMDExporter']() )

    } )

} )
