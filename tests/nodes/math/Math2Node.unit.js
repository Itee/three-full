/* global describe, it */

describe( 'Math2Node', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Math2Node'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Math2Node']() )

    } )

} )
