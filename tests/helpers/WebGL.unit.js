/* global describe, it */

describe( 'WebGL', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGL'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGL']() )

    } )

} )
