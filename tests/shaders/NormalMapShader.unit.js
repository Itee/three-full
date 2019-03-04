/* global describe, it */

describe( 'NormalMapShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NormalMapShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NormalMapShader']() )

    } )

} )
