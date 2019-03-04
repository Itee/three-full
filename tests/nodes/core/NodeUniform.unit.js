/* global describe, it */

describe( 'NodeUniform', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeUniform'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeUniform']() )

    } )

} )
