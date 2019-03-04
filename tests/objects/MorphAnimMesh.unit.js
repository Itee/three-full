/* global describe, it */

describe( 'MorphAnimMesh', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MorphAnimMesh'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MorphAnimMesh']() )

    } )

} )
