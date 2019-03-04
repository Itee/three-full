/* global describe, it */

describe( 'AudioLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AudioLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AudioLoader']() )

    } )

} )
