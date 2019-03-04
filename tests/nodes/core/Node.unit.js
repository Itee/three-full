/* global describe, it */

describe( 'Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Node']() )

    } )

} )
