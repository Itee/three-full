/* global describe, it */

describe( 'PMREMGenerator', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PMREMGenerator'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PMREMGenerator']() )

    } )

} )
