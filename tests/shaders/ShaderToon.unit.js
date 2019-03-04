/* global describe, it */

describe( 'ShaderToon', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderToon'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderToon']() )

    } )

} )
