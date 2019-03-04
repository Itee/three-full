/* global describe, it */

describe( 'WebGLState', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLState'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLState']() )

    } )

} )
