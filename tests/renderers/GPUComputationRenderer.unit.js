/* global describe, it */

describe( 'GPUComputationRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GPUComputationRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GPUComputationRenderer']() )

    } )

} )
