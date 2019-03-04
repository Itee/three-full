/* global describe, it */

describe( 'SSAARenderPass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['SSAARenderPass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['SSAARenderPass']() )

    } )

} )
