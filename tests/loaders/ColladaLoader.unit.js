/* global describe, it */

describe( 'ColladaLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColladaLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColladaLoader']() )

    } )

} )
