/* global describe, it */

describe( 'Object3D', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Object3D'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Object3D']() )

    } )

} )
