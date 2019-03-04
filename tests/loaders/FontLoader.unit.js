/* global describe, it */

describe( 'FontLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FontLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FontLoader']() )

    } )

} )
