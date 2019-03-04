/* global describe, it */

describe( 'PhongNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PhongNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PhongNode']() )

    } )

} )
