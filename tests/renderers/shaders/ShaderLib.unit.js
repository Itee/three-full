/* global describe, it */

describe( 'ShaderLib', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShaderLib'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShaderLib']() )

    } )

} )
