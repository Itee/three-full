/* global describe, it */

describe( 'QuickHull', () => {

    it( 'is bundlable', () => {

       should.exist( Three['QuickHull'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['QuickHull']() )

    } )

} )
