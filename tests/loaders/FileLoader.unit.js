/* global describe, it */

describe( 'FileLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FileLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FileLoader']() )

    } )

} )
