/* global describe, it */

describe( 'OBJExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OBJExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OBJExporter']() )

    } )

} )
