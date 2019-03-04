/* global describe, it */

describe( 'EffectComposer', () => {

    it( 'is bundlable', () => {

       should.exist( Three['EffectComposer'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['EffectComposer']() )

    } )

} )
