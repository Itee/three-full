/* global describe, it */

describe( 'NURBSUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NURBSUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NURBSUtils']() )

    } )

} )
