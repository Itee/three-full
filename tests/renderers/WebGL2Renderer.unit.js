/* global describe, it */

describe( 'WebGL2Renderer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebGL2Renderer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebGL2Renderer']() )

    } )

} )
