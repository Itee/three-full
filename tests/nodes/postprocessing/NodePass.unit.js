/* global describe, it */

describe( 'NodePass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodePass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodePass']() )

    } )

} )
