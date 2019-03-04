/* global describe, it */

describe( 'ShaderTranslucent', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderTranslucent'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderTranslucent']() )

    } )

} )
