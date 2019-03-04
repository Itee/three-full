/* global describe, it */

describe( 'TechnicolorShader', () => {

    it( 'is bundlable', () => {

       should.exist( Three['TechnicolorShader'] )

    } )

    it( 'is instanciable', () => {

       should.exist( new Three['TechnicolorShader']() )

    } )

} )
