/* global describe, it */

describe( 'HemisphereLight', () => {

    it( 'is bundlable', () => {

       should.exist( Three['HemisphereLight'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['HemisphereLight']() )

    } )

} )
