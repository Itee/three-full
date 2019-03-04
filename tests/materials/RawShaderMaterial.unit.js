/* global describe, it */

describe( 'RawShaderMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RawShaderMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RawShaderMaterial']() )

    } )

} )
