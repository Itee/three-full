/* global describe, it */

describe( 'BoxLineGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BoxLineGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BoxLineGeometry']() )

    } )

} )
