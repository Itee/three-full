/* global describe, it */

describe( 'Path', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Path'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Path']() )

    } )

} )
