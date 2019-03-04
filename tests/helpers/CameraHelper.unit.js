/* global describe, it */

describe( 'CameraHelper', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CameraHelper'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CameraHelper']() )

    } )

} )
