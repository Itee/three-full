/* global describe, it */

describe( 'TGALoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TGALoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TGALoader']() )

    } )

} )
