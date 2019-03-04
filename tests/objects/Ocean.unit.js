/* global describe, it */

describe( 'Ocean', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Ocean'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Ocean']() )

    } )

} )
