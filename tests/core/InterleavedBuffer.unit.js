/* global describe, it */

describe( 'InterleavedBuffer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['InterleavedBuffer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['InterleavedBuffer']() )

    } )

} )
