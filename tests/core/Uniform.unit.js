/* global describe, it */

describe( 'Uniform', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Uniform'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Uniform']() )

    } )

} )
