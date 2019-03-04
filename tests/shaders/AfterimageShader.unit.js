/* global describe, it */

describe( 'AfterimageShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AfterimageShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AfterimageShader']() )

    } )

} )
