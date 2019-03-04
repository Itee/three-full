/* global describe, it */

describe( 'WebXRManager', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebXRManager'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebXRManager']() )

    } )

} )
