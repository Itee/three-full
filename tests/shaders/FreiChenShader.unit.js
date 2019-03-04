/* global describe, it */

describe( 'FreiChenShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FreiChenShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FreiChenShader']() )

    } )

} )
