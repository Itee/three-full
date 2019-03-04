/* global describe, it */

describe( 'Clock', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Clock'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Clock']() )

    } )

} )
