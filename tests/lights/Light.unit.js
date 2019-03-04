/* global describe, it */

describe( 'Light', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Light'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Light']() )

    } )

} )
