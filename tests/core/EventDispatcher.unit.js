/* global describe, it */

describe( 'EventDispatcher', () => {

    it( 'is bundlable', () => {

       should.exist( Three['EventDispatcher'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['EventDispatcher']() )

    } )

} )
