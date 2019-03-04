/* global describe, it */

describe( 'ObjectLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ObjectLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ObjectLoader']() )

    } )

} )
