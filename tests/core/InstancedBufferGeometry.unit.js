/* global describe, it */

describe( 'InstancedBufferGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['InstancedBufferGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['InstancedBufferGeometry']() )

    } )

} )
