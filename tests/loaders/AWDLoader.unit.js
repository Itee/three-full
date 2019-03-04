/* global describe, it */

describe( 'AWDLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AWDLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AWDLoader']() )

    } )

} )
