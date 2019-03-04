/* global describe, it */

describe( 'ImmediateRenderObject', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ImmediateRenderObject'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ImmediateRenderObject']() )

    } )

} )
