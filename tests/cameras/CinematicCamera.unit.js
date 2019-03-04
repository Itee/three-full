/* global describe, it */

describe( 'CinematicCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CinematicCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CinematicCamera']() )

    } )

} )
