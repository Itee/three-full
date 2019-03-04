/* global describe, it */

describe( 'PlayCanvasLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PlayCanvasLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PlayCanvasLoader']() )

    } )

} )
