/**
 * @author [Tristan Valcke]{@link https://github.com/Itee}
 * @license [BSD-3-Clause]{@link https://opensource.org/licenses/BSD-3-Clause}
 *
 * @file Todo
 *
 * @example Todo
 *
 */

module.exports = {
    '3MFLoader':          {
        exports: [ 'ThreeMFLoader' ]
    },
    CurveExtras:          {
        exports: [
            'GrannyKnot',
            'HeartCurve',
            'VivianiCurve',
            'KnotCurve',
            'HelixCurve',
            'TrefoilKnot',
            'TorusKnot',
            'CinquefoilKnot',
            'TrefoilPolynomialKnot',
            'FigureEightPolynomialKnot',
            'DecoratedTorusKnot4a',
            'DecoratedTorusKnot4b',
            'DecoratedTorusKnot5a',
            'DecoratedTorusKnot5c'
        ]
    },
    DracoExporter:        {
        exports: [ 'DRACOExporter' ]
    },
    GodRaysShader:        {
        exports: [
            'GodRaysDepthMaskShader',
            'GodRaysGenerateShader',
            'GodRaysCombineShader',
            'GodRaysFakeSunShader'
        ]
    },
    Interpolations:       {
        exports: [
            'CatmullRom',
            'QuadraticBezier',
            'CubicBezier'
        ]
    },
    Math:                 {
        exports: [ '_Math' ]
    },
    ParametricGeometries: {
        exports: [
            [ 'ParametricGeometries', 'TubeGeometry' ],
            [ 'ParametricGeometries', 'TorusKnotGeometry' ],
            [ 'ParametricGeometries', 'SphereGeometry' ],
            [ 'ParametricGeometries', 'PlaneGeometry' ]
        ]
    },
    RollerCoaster:        {
        exports: [
            'RollerCoasterGeometry',
            'RollerCoasterLiftersGeometry',
            'RollerCoasterShadowGeometry',
            'SkyGeometry',
            'TreesGeometry'
        ]
    },
    ShaderTranslucent:    {
        exports: [ 'TranslucentShader' ]
    },
    SkinShader:           {
        exports: [
            'SkinShaderBasic',
            'SkinShaderAdvanced',
            'SkinShaderBeckmann'
        ]
    },
    SMAAShader:           {
        exports: [
            'SMAABlendShader',
            'SMAAEdgesShader',
            'SMAAWeightsShader'
        ]
    },
    ToonShader:           {
        exports: [
            'ToonShader1',
            'ToonShader2',
            'ToonShaderHatching',
            'ToonShaderDotted'
        ]
    },
    VolumeShader:         {
        exports: [ 'VolumeRenderShader1' ]
    },
    WebVRUtils:           {
        exports: [ 'setProjectionFromUnion' ]
    }
}
