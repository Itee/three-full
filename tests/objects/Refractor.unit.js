/* global describe, it */

describe( 'Refractor', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Refractor'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Refractor']() )

    } )

} )
