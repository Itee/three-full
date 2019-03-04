/* global describe, it */

describe( 'WebGLGeometries', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLGeometries'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLGeometries']() )

    } )

} )
