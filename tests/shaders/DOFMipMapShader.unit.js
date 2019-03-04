/* global describe, it */

describe( 'DOFMipMapShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DOFMipMapShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DOFMipMapShader']() )

    } )

} )
