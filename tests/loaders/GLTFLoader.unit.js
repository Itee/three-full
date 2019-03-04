/* global describe, it */

describe( 'GLTFLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GLTFLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GLTFLoader']() )

    } )

} )
