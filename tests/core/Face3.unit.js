/* global describe, it */

describe( 'Face3', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Face3'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Face3']() )

    } )

} )
