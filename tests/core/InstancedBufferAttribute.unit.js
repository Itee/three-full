/* global describe, it */

describe( 'InstancedBufferAttribute', () => {

    it( 'is bundlable', () => {

       should.exist( Three['InstancedBufferAttribute'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['InstancedBufferAttribute']() )

    } )

} )
