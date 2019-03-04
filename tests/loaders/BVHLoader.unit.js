/* global describe, it */

describe( 'BVHLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BVHLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BVHLoader']() )

    } )

} )
