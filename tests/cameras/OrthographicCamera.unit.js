/* global describe, it */

describe( 'OrthographicCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OrthographicCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OrthographicCamera']() )

    } )

} )
