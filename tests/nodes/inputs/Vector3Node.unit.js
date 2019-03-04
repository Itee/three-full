/* global describe, it */

describe( 'Vector3Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Vector3Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Vector3Node']() )

    } )

} )
