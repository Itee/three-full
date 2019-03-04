/* global describe, it */

describe( 'AudioListener', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AudioListener'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AudioListener']() )

    } )

} )
