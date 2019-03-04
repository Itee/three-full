/* global describe, it */

describe( 'LightShadow', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LightShadow'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LightShadow']() )

    } )

} )
