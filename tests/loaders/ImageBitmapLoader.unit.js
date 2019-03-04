/* global describe, it */

describe( 'ImageBitmapLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ImageBitmapLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ImageBitmapLoader']() )

    } )

} )
