/* global describe, it */

describe( 'AnimationMixer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationMixer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationMixer']() )

    } )

} )
