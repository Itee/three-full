/* global describe, it */

describe( 'Vector4Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Vector4Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Vector4Node']() )

    } )

} )
