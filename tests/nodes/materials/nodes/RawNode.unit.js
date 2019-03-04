/* global describe, it */

describe( 'RawNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RawNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RawNode']() )

    } )

} )
