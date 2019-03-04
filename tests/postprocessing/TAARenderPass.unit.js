/* global describe, it */

describe( 'TAARenderPass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TAARenderPass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TAARenderPass']() )

    } )

} )
