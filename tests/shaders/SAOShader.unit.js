/* global describe, it */

describe( 'SAOShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SAOShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SAOShader']() )

    } )

} )
