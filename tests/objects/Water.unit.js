/* global describe, it */

describe( 'Water', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Water'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Water']() )

    } )

} )
