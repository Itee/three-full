/* global describe, it */

describe( 'FocusShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FocusShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FocusShader']() )

    } )

} )
