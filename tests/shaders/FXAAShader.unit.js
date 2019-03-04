/* global describe, it */

describe( 'FXAAShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FXAAShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FXAAShader']() )

    } )

} )
