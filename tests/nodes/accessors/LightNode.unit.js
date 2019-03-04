/* global describe, it */

describe( 'LightNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LightNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LightNode']() )

    } )

} )
