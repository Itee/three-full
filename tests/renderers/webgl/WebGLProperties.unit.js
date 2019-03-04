/* global describe, it */

describe( 'WebGLProperties', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLProperties'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLProperties']() )

    } )

} )
