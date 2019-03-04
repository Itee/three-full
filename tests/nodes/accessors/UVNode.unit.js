/* global describe, it */

describe( 'UVNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['UVNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['UVNode']() )

    } )

} )
