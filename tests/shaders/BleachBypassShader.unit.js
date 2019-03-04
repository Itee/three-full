/* global describe, it */

describe( 'BleachBypassShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BleachBypassShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BleachBypassShader']() )

    } )

} )
