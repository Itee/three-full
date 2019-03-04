/* global describe, it */

describe( 'AnimationObjectGroup', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationObjectGroup'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationObjectGroup']() )

    } )

} )
