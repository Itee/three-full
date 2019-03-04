/* global describe, it */

describe( 'PositionalAudio', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PositionalAudio'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PositionalAudio']() )

    } )

} )
