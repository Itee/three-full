/* global describe, it */

describe( 'LegacyGLTFLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LegacyGLTFLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LegacyGLTFLoader']() )

    } )

} )
