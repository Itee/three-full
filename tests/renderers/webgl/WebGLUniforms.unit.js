/* global describe, it */

describe( 'WebGLUniforms', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLUniforms'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLUniforms']() )

    } )

} )
