/* global describe, it */

describe( 'WebGLRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLRenderer']() )

    } )

} )
