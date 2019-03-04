/* global describe, it */

describe( 'BypassNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BypassNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BypassNode']() )

    } )

} )
