/* global describe, it */

describe( 'TorusKnotGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TorusKnotGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TorusKnotGeometry']() )

    } )

} )
