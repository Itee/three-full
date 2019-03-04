/* global describe, it */

describe( 'MathUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MathUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MathUtils']() )

    } )

} )
