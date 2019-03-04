/* global describe, it */

describe( 'FresnelShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FresnelShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FresnelShader']() )

    } )

} )
