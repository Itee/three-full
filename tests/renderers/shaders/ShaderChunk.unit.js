/* global describe, it */

describe( 'ShaderChunk', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderChunk'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderChunk']() )

    } )

} )
