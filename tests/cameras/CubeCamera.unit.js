/* global describe, it */

describe( 'CubeCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CubeCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CubeCamera']() )

    } )

} )
