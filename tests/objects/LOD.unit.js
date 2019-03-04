/* global describe, it */

describe( 'LOD', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LOD'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LOD']() )

    } )

} )
