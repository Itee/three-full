/* global describe, it */

describe( 'Mesh', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Mesh'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Mesh']() )

    } )

} )
