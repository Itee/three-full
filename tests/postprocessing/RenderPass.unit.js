/* global describe, it */

describe( 'RenderPass', () => {

    it( 'is bundlable', () => {

       should.exist( Three['RenderPass'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['RenderPass']() )

    } )

} )
