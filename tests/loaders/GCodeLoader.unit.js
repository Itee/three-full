/* global describe, it */

describe( 'GCodeLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['GCodeLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['GCodeLoader']() )

    } )

} )
