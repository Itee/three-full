/* global describe, it */

describe( 'Math', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Math'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Math']() )

    } )

} )
