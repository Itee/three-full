/* global describe, it */

describe( 'PerspectiveCamera', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PerspectiveCamera'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PerspectiveCamera']() )

    } )

} )
