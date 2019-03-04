/* global describe, it */

describe( 'KaleidoShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['KaleidoShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['KaleidoShader']() )

    } )

} )
