/* global describe, it */

describe( 'SobelOperatorShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SobelOperatorShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SobelOperatorShader']() )

    } )

} )
