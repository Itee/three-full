/* global describe, it */

describe( 'MarchingCubes', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MarchingCubes'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MarchingCubes']() )

    } )

} )
