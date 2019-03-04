/* global describe, it */

describe( 'MirrorShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['MirrorShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['MirrorShader']() )

    } )

} )
