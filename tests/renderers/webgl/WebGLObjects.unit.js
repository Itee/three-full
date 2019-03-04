/* global describe, it */

describe( 'WebGLObjects', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLObjects'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLObjects']() )

    } )

} )
