/* global describe, it */

describe( 'WebGLCapabilities', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLCapabilities'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLCapabilities']() )

    } )

} )
