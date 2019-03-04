/* global describe, it */

describe( 'UniformsLib', () => {

    it( 'is bundlable', () => {

       should.exist( Three['UniformsLib'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['UniformsLib']() )

    } )

} )
