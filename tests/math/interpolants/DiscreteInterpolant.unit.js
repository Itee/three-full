/* global describe, it */

describe( 'DiscreteInterpolant', () => {

    it( 'is bundlable', () => {

       should.exist( Three['DiscreteInterpolant'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['DiscreteInterpolant']() )

    } )

} )
