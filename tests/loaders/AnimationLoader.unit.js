/* global describe, it */

describe( 'AnimationLoader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationLoader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationLoader']() )

    } )

} )
