/* global describe, it */

describe( 'ColorifyShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorifyShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorifyShader']() )

    } )

} )
