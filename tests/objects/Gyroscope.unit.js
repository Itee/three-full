/* global describe, it */

describe( 'Gyroscope', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Gyroscope'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Gyroscope']() )

    } )

} )
