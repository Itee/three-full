/* global describe, it */

describe( 'BokehShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['BokehShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['BokehShader']() )

    } )

} )
