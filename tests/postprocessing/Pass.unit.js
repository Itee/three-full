/* global describe, it */

describe( 'Pass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Pass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Pass']() )

    } )

} )
