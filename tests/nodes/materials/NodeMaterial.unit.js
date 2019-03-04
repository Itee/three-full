/* global describe, it */

describe( 'NodeMaterial', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeMaterial'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeMaterial']() )

    } )

} )
