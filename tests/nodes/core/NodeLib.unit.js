/* global describe, it */

describe( 'NodeLib', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeLib'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeLib']() )

    } )

} )
