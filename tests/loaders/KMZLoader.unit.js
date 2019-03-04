/* global describe, it */

describe( 'KMZLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['KMZLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['KMZLoader']() )

    } )

} )
