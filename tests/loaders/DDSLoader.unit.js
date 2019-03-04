/* global describe, it */

describe( 'DDSLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DDSLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DDSLoader']() )

    } )

} )
