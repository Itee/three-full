/* global describe, it */

describe( 'NoiseNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NoiseNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NoiseNode']() )

    } )

} )
