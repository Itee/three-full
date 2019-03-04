/* global describe, it */

describe( 'WebGLPrograms', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGLPrograms'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGLPrograms']() )

    } )

} )
