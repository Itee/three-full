/* global describe, it */

describe( 'Matrix3', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Matrix3'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Matrix3']() )

    } )

} )
