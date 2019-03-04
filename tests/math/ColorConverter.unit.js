/* global describe, it */

describe( 'ColorConverter', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ColorConverter'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ColorConverter']() )

    } )

} )
