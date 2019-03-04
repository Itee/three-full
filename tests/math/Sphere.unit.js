/* global describe, it */

describe( 'Sphere', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Sphere'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Sphere']() )

    } )

} )
