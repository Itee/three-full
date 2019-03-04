/* global describe, it */

describe( 'TorusGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TorusGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TorusGeometry']() )

    } )

} )
