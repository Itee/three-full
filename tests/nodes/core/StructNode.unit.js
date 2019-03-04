/* global describe, it */

describe( 'StructNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StructNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StructNode']() )

    } )

} )
