/* global describe, it */

describe( 'NodeFrame', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodeFrame'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodeFrame']() )

    } )

} )
