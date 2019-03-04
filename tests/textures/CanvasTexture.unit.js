/* global describe, it */

describe( 'CanvasTexture', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CanvasTexture'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CanvasTexture']() )

    } )

} )
