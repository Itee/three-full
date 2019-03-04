/* global describe, it */

describe( 'ToneMapShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ToneMapShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ToneMapShader']() )

    } )

} )
