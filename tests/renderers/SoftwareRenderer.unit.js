/* global describe, it */

describe( 'SoftwareRenderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SoftwareRenderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SoftwareRenderer']() )

    } )

} )
