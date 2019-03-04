/* global describe, it */

describe( 'TeapotBufferGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TeapotBufferGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TeapotBufferGeometry']() )

    } )

} )
