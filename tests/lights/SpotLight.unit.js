/* global describe, it */

describe( 'SpotLight', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SpotLight'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SpotLight']() )

    } )

} )
