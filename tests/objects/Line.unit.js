/* global describe, it */

describe( 'Line', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Line'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Line']() )

    } )

} )
