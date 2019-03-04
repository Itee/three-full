/* global describe, it */

describe( 'STLExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['STLExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['STLExporter']() )

    } )

} )
