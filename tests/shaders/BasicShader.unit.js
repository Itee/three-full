/* global describe, it */

describe( 'BasicShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BasicShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BasicShader']() )

    } )

} )
