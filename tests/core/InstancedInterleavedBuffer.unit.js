/* global describe, it */

describe( 'InstancedInterleavedBuffer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['InstancedInterleavedBuffer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['InstancedInterleavedBuffer']() )

    } )

} )
