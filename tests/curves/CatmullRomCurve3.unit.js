/* global describe, it */

describe( 'CatmullRomCurve3', () => {

    it( 'is bundlable', () => {

       should.exist( Three['CatmullRomCurve3'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['CatmullRomCurve3']() )

    } )

} )
