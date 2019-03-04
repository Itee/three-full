/* global describe, it */

describe( 'AudioContext', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AudioContext'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AudioContext']() )

    } )

} )
