/* global describe, it */

describe( 'STLLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['STLLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['STLLoader']() )

    } )

} )
