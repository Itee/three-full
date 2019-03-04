/* global describe, it */

describe( 'Camera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Camera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Camera']() )

    } )

} )
