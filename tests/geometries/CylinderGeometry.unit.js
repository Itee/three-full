/* global describe, it */

describe( 'CylinderGeometry', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CylinderGeometry'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CylinderGeometry']() )

    } )

} )
