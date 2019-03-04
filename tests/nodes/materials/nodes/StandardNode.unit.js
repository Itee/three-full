/* global describe, it */

describe( 'StandardNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['StandardNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['StandardNode']() )

    } )

} )
