/* global describe, it */

describe( 'Quaternion', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Quaternion'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Quaternion']() )

    } )

} )
