/* global describe, it */

describe( 'ArrayCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ArrayCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ArrayCamera']() )

    } )

} )
