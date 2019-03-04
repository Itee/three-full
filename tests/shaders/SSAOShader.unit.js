/* global describe, it */

describe( 'SSAOShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SSAOShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SSAOShader']() )

    } )

} )
