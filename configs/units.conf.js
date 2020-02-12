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
    '3MFLoader': {
        exports: [ 'ThreeMFLoader' ]
    },
    CurveExtras: {
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
    Interpolations: {
        exports: [ 'CatmullRom', 'QuadraticBezier', 'CubicBezier' ]
    },
    Math: {
        exports: [ '_Math' ]
    },
    RollerCoaster: {
        exports: [
            'RollerCoasterGeometry',
            'RollerCoasterLiftersGeometry',
            'RollerCoasterShadowGeometry',
            'SkyGeometry',
            'TreesGeometry'
        ]
    },
    ShaderTranslucent: {
        exports: [ 'TranslucentShader' ]
    },
    WebVRUtils: {
        exports: [ 'setProjectionFromUnion' ]
    },
}
