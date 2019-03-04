/* global describe, it */

describe( 'Matrix4', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Matrix4'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Matrix4']() )

    } )

} )
