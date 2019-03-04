/* global describe, it */

describe( 'SimplexNoise', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SimplexNoise'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SimplexNoise']() )

    } )

} )
