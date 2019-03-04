/* global describe, it */

describe( 'PRWMLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['PRWMLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['PRWMLoader']() )

    } )

} )
