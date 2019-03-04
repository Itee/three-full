/* global describe, it */

describe( 'VRMLLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['VRMLLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['VRMLLoader']() )

    } )

} )
