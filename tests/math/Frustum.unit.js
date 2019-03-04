/* global describe, it */

describe( 'Frustum', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Frustum'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Frustum']() )

    } )

} )
