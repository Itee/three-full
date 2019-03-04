/* global describe, it */

describe( 'AMFLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AMFLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AMFLoader']() )

    } )

} )
