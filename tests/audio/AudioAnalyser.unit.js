/* global describe, it */

describe( 'AudioAnalyser', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AudioAnalyser'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AudioAnalyser']() )

    } )

} )
