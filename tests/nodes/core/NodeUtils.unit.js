/* global describe, it */

describe( 'NodeUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeUtils']() )

    } )

} )
