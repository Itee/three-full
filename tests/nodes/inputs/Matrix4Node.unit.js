/* global describe, it */

describe( 'Matrix4Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Matrix4Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Matrix4Node']() )

    } )

} )
