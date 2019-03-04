/* global describe, it */

describe( 'GLTFExporter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GLTFExporter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GLTFExporter']() )

    } )

} )
