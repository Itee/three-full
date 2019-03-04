/* global describe, it */

describe( 'WaterRefractionShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WaterRefractionShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WaterRefractionShader']() )

    } )

} )
