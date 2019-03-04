/* global describe, it */

describe( 'AsciiEffect', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AsciiEffect'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AsciiEffect']() )

    } )

} )
