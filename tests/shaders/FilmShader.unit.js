/* global describe, it */

describe( 'FilmShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['FilmShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['FilmShader']() )

    } )

} )
