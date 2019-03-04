/* global describe, it */

describe( 'DRACOLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DRACOLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DRACOLoader']() )

    } )

} )
