/* global describe, it */

describe( 'DotScreenShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DotScreenShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DotScreenShader']() )

    } )

} )
