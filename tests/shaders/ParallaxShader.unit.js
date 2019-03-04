/* global describe, it */

describe( 'ParallaxShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ParallaxShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ParallaxShader']() )

    } )

} )
