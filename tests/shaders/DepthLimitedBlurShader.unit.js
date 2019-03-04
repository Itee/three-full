/* global describe, it */

describe( 'DepthLimitedBlurShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DepthLimitedBlurShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DepthLimitedBlurShader']() )

    } )

} )
