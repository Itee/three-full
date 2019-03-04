/* global describe, it */

describe( 'Wireframe', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Wireframe'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Wireframe']() )

    } )

} )
