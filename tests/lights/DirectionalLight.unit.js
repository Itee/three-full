/* global describe, it */

describe( 'DirectionalLight', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DirectionalLight'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DirectionalLight']() )

    } )

} )
