/* global describe, it */

describe( 'ShapeUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShapeUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShapeUtils']() )

    } )

} )
