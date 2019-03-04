/* global describe, it */

describe( 'VRMLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VRMLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VRMLoader']() )

    } )

} )
