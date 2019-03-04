/* global describe, it */

describe( 'AnimationClip', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationClip'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationClip']() )

    } )

} )
