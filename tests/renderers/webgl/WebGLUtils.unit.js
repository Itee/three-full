/* global describe, it */

describe( 'WebGLUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLUtils']() )

    } )

} )
