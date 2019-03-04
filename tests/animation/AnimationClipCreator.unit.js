/* global describe, it */

describe( 'AnimationClipCreator', () => {

    it( 'is bundlable', () => {

       should.exist( Three['AnimationClipCreator'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['AnimationClipCreator']() )

    } )

} )
