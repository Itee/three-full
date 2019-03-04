/* global describe, it */

describe( 'BufferAttribute', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BufferAttribute'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BufferAttribute']() )

    } )

} )
