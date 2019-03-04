/* global describe, it */

describe( 'ViveController', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ViveController'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ViveController']() )

    } )

} )
