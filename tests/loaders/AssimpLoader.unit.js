/* global describe, it */

describe( 'AssimpLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AssimpLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AssimpLoader']() )

    } )

} )
