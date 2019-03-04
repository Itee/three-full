/* global describe, it */

describe( 'TubeGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TubeGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TubeGeometry']() )

    } )

} )
