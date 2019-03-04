/* global describe, it */

describe( 'NURBSSurface', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NURBSSurface'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NURBSSurface']() )

    } )

} )
