/* global describe, it */

describe( 'LoaderSupport', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LoaderSupport'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LoaderSupport']() )

    } )

} )
