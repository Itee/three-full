/* global describe, it */

describe( 'PDBLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PDBLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PDBLoader']() )

    } )

} )
