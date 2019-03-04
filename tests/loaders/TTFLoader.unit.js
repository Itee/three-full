/* global describe, it */

describe( 'TTFLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TTFLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TTFLoader']() )

    } )

} )
