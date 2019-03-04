/* global describe, it */

describe( 'ConstNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ConstNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ConstNode']() )

    } )

} )
