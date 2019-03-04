/* global describe, it */

describe( 'WebGLDeferredRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLDeferredRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLDeferredRenderer']() )

    } )

} )
