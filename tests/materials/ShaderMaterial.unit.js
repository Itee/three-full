/* global describe, it */

describe( 'ShaderMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderMaterial']() )

    } )

} )
