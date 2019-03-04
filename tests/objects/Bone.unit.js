/* global describe, it */

describe( 'Bone', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Bone'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Bone']() )

    } )

} )
