/* global describe, it */

describe( 'EquirectangularToCubeGenerator', () => {

    it( 'is bundlable', () => {

       should.exist( Three['EquirectangularToCubeGenerator'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['EquirectangularToCubeGenerator']() )

    } )

} )
