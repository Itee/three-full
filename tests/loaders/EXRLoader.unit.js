/* global describe, it */

describe( 'EXRLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['EXRLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['EXRLoader']() )

    } )

} )
