/* global describe, it */

describe( 'VolumeShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VolumeShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VolumeShader']() )

    } )

} )
