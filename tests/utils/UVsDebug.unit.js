/* global describe, it */

describe( 'UVsDebug', () => {

    it( 'is bundlable', () => {

       should.exist( Three['UVsDebug'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['UVsDebug']() )

    } )

} )
