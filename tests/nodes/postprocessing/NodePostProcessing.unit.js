/* global describe, it */

describe( 'NodePostProcessing', () => {

    it( 'is bundlable', () => {

       should.exist( Three['NodePostProcessing'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['NodePostProcessing']() )

    } )

} )
