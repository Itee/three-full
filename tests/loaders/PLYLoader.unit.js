/* global describe, it */

describe( 'PLYLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PLYLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PLYLoader']() )

    } )

} )
