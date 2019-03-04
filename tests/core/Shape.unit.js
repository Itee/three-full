/* global describe, it */

describe( 'Shape', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Shape'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Shape']() )

    } )

} )
