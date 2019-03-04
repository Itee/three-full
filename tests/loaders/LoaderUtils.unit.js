/* global describe, it */

describe( 'LoaderUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LoaderUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LoaderUtils']() )

    } )

} )
