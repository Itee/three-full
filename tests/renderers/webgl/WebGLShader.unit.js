/* global describe, it */

describe( 'WebGLShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLShader']() )

    } )

} )
