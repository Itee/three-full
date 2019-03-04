/* global describe, it */

describe( '3MFLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['3MFLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['3MFLoader']() )

    } )

} )
