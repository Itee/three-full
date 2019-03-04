/* global describe, it */

describe( 'WebGLInfo', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLInfo'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLInfo']() )

    } )

} )
