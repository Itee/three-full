/* global describe, it */

describe( 'Matrix3Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Matrix3Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Matrix3Node']() )

    } )

} )
