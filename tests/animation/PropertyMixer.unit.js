/* global describe, it */

describe( 'PropertyMixer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PropertyMixer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PropertyMixer']() )

    } )

} )
