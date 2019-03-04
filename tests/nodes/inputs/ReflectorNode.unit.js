/* global describe, it */

describe( 'ReflectorNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ReflectorNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ReflectorNode']() )

    } )

} )
