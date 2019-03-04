/* global describe, it */

describe( 'ShaderTerrain', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderTerrain'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderTerrain']() )

    } )

} )
