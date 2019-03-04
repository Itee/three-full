/* global describe, it */

describe( 'VignetteShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VignetteShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VignetteShader']() )

    } )

} )
