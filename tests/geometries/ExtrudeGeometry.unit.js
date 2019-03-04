/* global describe, it */

describe( 'ExtrudeGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ExtrudeGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ExtrudeGeometry']() )

    } )

} )
