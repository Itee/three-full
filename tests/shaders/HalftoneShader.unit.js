/* global describe, it */

describe( 'HalftoneShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['HalftoneShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['HalftoneShader']() )

    } )

} )
