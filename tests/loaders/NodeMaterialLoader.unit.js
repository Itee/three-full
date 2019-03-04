/* global describe, it */

describe( 'NodeMaterialLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeMaterialLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeMaterialLoader']() )

    } )

} )
