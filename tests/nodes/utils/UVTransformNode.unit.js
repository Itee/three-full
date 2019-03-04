/* global describe, it */

describe( 'UVTransformNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['UVTransformNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['UVTransformNode']() )

    } )

} )
