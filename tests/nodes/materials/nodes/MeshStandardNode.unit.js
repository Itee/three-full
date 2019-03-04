/* global describe, it */

describe( 'MeshStandardNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MeshStandardNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MeshStandardNode']() )

    } )

} )
