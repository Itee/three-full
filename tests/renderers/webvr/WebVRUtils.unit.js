/* global describe, it */

describe( 'WebVRUtils', () => {

    it( 'is bundlable', () => {

       should.exist( Three['WebVRUtils'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['WebVRUtils']() )

    } )

} )
