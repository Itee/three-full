/* global describe, it */

describe( 'Scene', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Scene'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Scene']() )

    } )

} )
