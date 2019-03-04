/* global describe, it */

describe( 'ColorNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorNode']() )

    } )

} )
