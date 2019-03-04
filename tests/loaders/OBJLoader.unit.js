/* global describe, it */

describe( 'OBJLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OBJLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OBJLoader']() )

    } )

} )
