/* global describe, it */

describe( 'WireframeGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WireframeGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WireframeGeometry']() )

    } )

} )
