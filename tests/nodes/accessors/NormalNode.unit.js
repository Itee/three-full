/* global describe, it */

describe( 'NormalNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NormalNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NormalNode']() )

    } )

} )
