/* global describe, it */

describe( 'ShaderPass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderPass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderPass']() )

    } )

} )
