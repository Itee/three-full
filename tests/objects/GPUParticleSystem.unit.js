/* global describe, it */

describe( 'GPUParticleSystem', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GPUParticleSystem'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GPUParticleSystem']() )

    } )

} )
