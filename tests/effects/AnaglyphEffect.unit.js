/* global describe, it */

describe( 'AnaglyphEffect', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnaglyphEffect'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnaglyphEffect']() )

    } )

} )
