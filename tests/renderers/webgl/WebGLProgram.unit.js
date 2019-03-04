/* global describe, it */

describe( 'WebGLProgram', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLProgram'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLProgram']() )

    } )

} )
