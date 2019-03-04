/* global describe, it */

describe( 'WebGLExtensions', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLExtensions'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLExtensions']() )

    } )

} )
