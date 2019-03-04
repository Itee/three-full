/* global describe, it */

describe( 'MTLLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MTLLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MTLLoader']() )

    } )

} )
