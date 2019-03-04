/* global describe, it */

describe( 'WebGLBackground', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLBackground'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLBackground']() )

    } )

} )
