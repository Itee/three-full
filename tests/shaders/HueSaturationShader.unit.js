/* global describe, it */

describe( 'HueSaturationShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['HueSaturationShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['HueSaturationShader']() )

    } )

} )
