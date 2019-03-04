/* global describe, it */

describe( 'LuminanceNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['LuminanceNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['LuminanceNode']() )

    } )

} )
