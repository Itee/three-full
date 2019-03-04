/* global describe, it */

describe( 'BoxGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BoxGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BoxGeometry']() )

    } )

} )
