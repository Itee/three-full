/* global describe, it */

describe( 'Sky', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Sky'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Sky']() )

    } )

} )
