/* global describe, it */

describe( 'Projector', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Projector'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Projector']() )

    } )

} )
