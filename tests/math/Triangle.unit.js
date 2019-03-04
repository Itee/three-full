/* global describe, it */

describe( 'Triangle', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Triangle'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Triangle']() )

    } )

} )
