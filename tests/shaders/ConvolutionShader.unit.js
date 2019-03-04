/* global describe, it */

describe( 'ConvolutionShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ConvolutionShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ConvolutionShader']() )

    } )

} )
