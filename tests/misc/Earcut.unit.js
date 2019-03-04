/* global describe, it */

describe( 'Earcut', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Earcut'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Earcut']() )

    } )

} )
