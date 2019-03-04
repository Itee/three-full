/* global describe, it */

describe( 'MorphBlendMesh', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MorphBlendMesh'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MorphBlendMesh']() )

    } )

} )
