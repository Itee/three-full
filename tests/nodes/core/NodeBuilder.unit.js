/* global describe, it */

describe( 'NodeBuilder', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeBuilder'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeBuilder']() )

    } )

} )
