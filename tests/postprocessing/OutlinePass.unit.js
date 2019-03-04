/* global describe, it */

describe( 'OutlinePass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['OutlinePass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['OutlinePass']() )

    } )

} )
