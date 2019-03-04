/* global describe, it */

describe( 'AmbientLight', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AmbientLight'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AmbientLight']() )

    } )

} )
