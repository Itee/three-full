/* global describe, it */

describe( 'CameraNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CameraNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CameraNode']() )

    } )

} )
