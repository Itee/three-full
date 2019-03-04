/* global describe, it */

describe( 'ShapeGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShapeGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShapeGeometry']() )

    } )

} )
