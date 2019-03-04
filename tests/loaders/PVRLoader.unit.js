/* global describe, it */

describe( 'PVRLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PVRLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PVRLoader']() )

    } )

} )
