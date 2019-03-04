/* global describe, it */

describe( 'ColorSpaceNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorSpaceNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorSpaceNode']() )

    } )

} )
