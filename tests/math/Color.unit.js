/* global describe, it */

describe( 'Color', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Color'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Color']() )

    } )

} )
