/* global describe, it */

describe( 'LoadingManager', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LoadingManager'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LoadingManager']() )

    } )

} )
