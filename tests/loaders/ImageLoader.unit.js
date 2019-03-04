/* global describe, it */

describe( 'ImageLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ImageLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ImageLoader']() )

    } )

} )
