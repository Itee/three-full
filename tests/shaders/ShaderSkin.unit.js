/* global describe, it */

describe( 'ShaderSkin', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderSkin'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderSkin']() )

    } )

} )
