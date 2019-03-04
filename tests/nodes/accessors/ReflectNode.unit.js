/* global describe, it */

describe( 'ReflectNode', () => {

    it( 'is bundlable', () => {

       should.exist( Three['ReflectNode'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['ReflectNode']() )

    } )

} )
