/* global describe, it */

describe( 'FBXLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FBXLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FBXLoader']() )

    } )

} )
