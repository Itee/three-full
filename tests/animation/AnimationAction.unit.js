/* global describe, it */

describe( 'AnimationAction', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationAction'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationAction']() )

    } )

} )
