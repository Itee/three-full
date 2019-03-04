/* global describe, it */

describe( 'Audio', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Audio'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Audio']() )

    } )

} )
