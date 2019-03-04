/* global describe, it */

describe( 'SkinnedMesh', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SkinnedMesh'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SkinnedMesh']() )

    } )

} )
