/* global describe, it */

describe( 'PointLight', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PointLight'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PointLight']() )

    } )

} )
