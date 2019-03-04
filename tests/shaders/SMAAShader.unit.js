/* global describe, it */

describe( 'SMAAShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SMAAShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SMAAShader']() )

    } )

} )
