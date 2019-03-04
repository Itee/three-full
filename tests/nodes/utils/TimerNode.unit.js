/* global describe, it */

describe( 'TimerNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TimerNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TimerNode']() )

    } )

} )
