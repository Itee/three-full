/* global describe, it */

describe( 'BlendShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BlendShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BlendShader']() )

    } )

} )
