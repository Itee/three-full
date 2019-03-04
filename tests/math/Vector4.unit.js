/* global describe, it */

describe( 'Vector4', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Vector4'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Vector4']() )

    } )

} )
