/* global describe, it */

describe( 'Vector3', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Vector3'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Vector3']() )

    } )

} )
