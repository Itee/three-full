/* global describe, it */

describe( 'PropertyNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PropertyNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PropertyNode']() )

    } )

} )
