/* global describe, it */

describe( 'MaterialLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MaterialLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MaterialLoader']() )

    } )

} )
