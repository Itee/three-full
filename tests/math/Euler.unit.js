/* global describe, it */

describe( 'Euler', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Euler'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Euler']() )

    } )

} )
