/* global describe, it */

describe( 'Group', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Group'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Group']() )

    } )

} )
