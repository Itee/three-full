/* global describe, it */

describe( 'Font', () => {

    it( 'is bundlable', () => {

       should.exist( Three['Font'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['Font']() )

    } )

} )
