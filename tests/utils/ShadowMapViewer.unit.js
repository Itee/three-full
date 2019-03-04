/* global describe, it */

describe( 'ShadowMapViewer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ShadowMapViewer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ShadowMapViewer']() )

    } )

} )
