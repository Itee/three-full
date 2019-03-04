/* global describe, it */

describe( 'WebGLAnimation', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLAnimation'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLAnimation']() )

    } )

} )
