/* global describe, it */

describe( 'TempNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TempNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TempNode']() )

    } )

} )
