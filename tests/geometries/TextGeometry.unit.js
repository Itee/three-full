/* global describe, it */

describe( 'TextGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TextGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TextGeometry']() )

    } )

} )
