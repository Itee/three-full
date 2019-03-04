/* global describe, it */

describe( 'WebGLAttributes', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLAttributes'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLAttributes']() )

    } )

} )
