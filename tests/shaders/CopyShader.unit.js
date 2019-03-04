/* global describe, it */

describe( 'CopyShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CopyShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CopyShader']() )

    } )

} )
