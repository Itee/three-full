/* global describe, it */

describe( 'VTKLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VTKLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VTKLoader']() )

    } )

} )
