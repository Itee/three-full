//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { FileLoader } from './FileLoader.js'
import { ShapePath } from '../core/ShapePath.js'
import { Vector2 } from '../math/Vector2.js'
import { Path } from '../core/Path.js'
import { Matrix3 } from '../math/Matrix3.js'
import { Vector3 } from '../math/Vector3.js'
import { DefaultLoadingManager } from './LoadingManager.js'
var SVGLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

};

SVGLoader.prototype = {

	constructor: SVGLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	},

	parse: function ( text ) {

		function parseNode( node, style ) {

			if ( node.nodeType !== 1 ) return;

			var transform = getNodeTransform( node );

			var path = null;

			switch ( node.nodeName ) {

				case 'svg':
					break;

				case 'g':
					style = parseStyle( node, style );
					break;

				case 'path':
					style = parseStyle( node, style );
					if ( node.hasAttribute( 'd' ) && isVisible( style ) ) path = parsePathNode( node, style );
					break;

				case 'rect':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parseRectNode( node, style );
					break;

				case 'polygon':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parsePolygonNode( node, style );
					break;

				case 'polyline':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parsePolylineNode( node, style );
					break;

				case 'circle':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parseCircleNode( node, style );
					break;

				case 'ellipse':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parseEllipseNode( node, style );
					break;

				case 'line':
					style = parseStyle( node, style );
					if ( isVisible( style ) ) path = parseLineNode( node, style );
					break;

				default:
					console.log( node );

			}

			if ( path ) {

				transformPath( path, currentTransform );

				paths.push( path );

			}

			var nodes = node.childNodes;

			for ( var i = 0; i < nodes.length; i ++ ) {

				parseNode( nodes[ i ], style );

			}

			if ( transform ) {

				currentTransform.copy( transformStack.pop() );

			}

		}

		function parsePathNode( node, style ) {

			var path = new ShapePath();
			path.color.setStyle( style.fill );

			var point = new Vector2();
			var control = new Vector2();

			var firstPoint = new Vector2();
			var isFirstPoint = true;
			var doSetFirstPoint = false;

			var d = node.getAttribute( 'd' );

			// console.log( d );

			var commands = d.match( /[a-df-z][^a-df-z]*/ig );

			for ( var i = 0, l = commands.length; i < l; i ++ ) {

				var command = commands[ i ];

				var type = command.charAt( 0 );
				var data = command.substr( 1 ).trim();

				if ( isFirstPoint === true ) {
					doSetFirstPoint = true;
					isFirstPoint = false;
				}

				switch ( type ) {

					case 'M':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							point.x = numbers[ j + 0 ];
							point.y = numbers[ j + 1 ];
							control.x = point.x;
							control.y = point.y;
							if ( j === 0 ) {
								path.moveTo( point.x, point.y );
							} else {
								path.lineTo( point.x, point.y );
							}
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'H':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
							point.x = numbers[ j ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'V':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
							point.y = numbers[ j ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'L':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							point.x = numbers[ j + 0 ];
							point.y = numbers[ j + 1 ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'C':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 6 ) {
							path.bezierCurveTo(
								numbers[ j + 0 ],
								numbers[ j + 1 ],
								numbers[ j + 2 ],
								numbers[ j + 3 ],
								numbers[ j + 4 ],
								numbers[ j + 5 ]
							);
							control.x = numbers[ j + 2 ];
							control.y = numbers[ j + 3 ];
							point.x = numbers[ j + 4 ];
							point.y = numbers[ j + 5 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'S':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
							path.bezierCurveTo(
								getReflection( point.x, control.x ),
								getReflection( point.y, control.y ),
								numbers[ j + 0 ],
								numbers[ j + 1 ],
								numbers[ j + 2 ],
								numbers[ j + 3 ]
							);
							control.x = numbers[ j + 0 ];
							control.y = numbers[ j + 1 ];
							point.x = numbers[ j + 2 ];
							point.y = numbers[ j + 3 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'Q':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
							path.quadraticCurveTo(
								numbers[ j + 0 ],
								numbers[ j + 1 ],
								numbers[ j + 2 ],
								numbers[ j + 3 ]
							);
							control.x = numbers[ j + 0 ];
							control.y = numbers[ j + 1 ];
							point.x = numbers[ j + 2 ];
							point.y = numbers[ j + 3 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'T':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							var rx = getReflection( point.x, control.x );
							var ry = getReflection( point.y, control.y );
							path.quadraticCurveTo(
								rx,
								ry,
								numbers[ j + 0 ],
								numbers[ j + 1 ]
							);
							control.x = rx;
							control.y = ry;
							point.x = numbers[ j + 0 ];
							point.y = numbers[ j + 1 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'A':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 7 ) {
							var start = point.clone();
							point.x = numbers[ j + 5 ];
							point.y = numbers[ j + 6 ];
							control.x = point.x;
							control.y = point.y;
							parseArcCommand(
								path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
							);
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					//

					case 'm':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							point.x += numbers[ j + 0 ];
							point.y += numbers[ j + 1 ];
							control.x = point.x;
							control.y = point.y;
							if ( j === 0 ) {
								path.moveTo( point.x, point.y );
							} else {
								path.lineTo( point.x, point.y );
							}
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'h':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
							point.x += numbers[ j ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'v':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j ++ ) {
							point.y += numbers[ j ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'l':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							point.x += numbers[ j + 0 ];
							point.y += numbers[ j + 1 ];
							control.x = point.x;
							control.y = point.y;
							path.lineTo( point.x, point.y );
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'c':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 6 ) {
							path.bezierCurveTo(
								point.x + numbers[ j + 0 ],
								point.y + numbers[ j + 1 ],
								point.x + numbers[ j + 2 ],
								point.y + numbers[ j + 3 ],
								point.x + numbers[ j + 4 ],
								point.y + numbers[ j + 5 ]
							);
							control.x = point.x + numbers[ j + 2 ];
							control.y = point.y + numbers[ j + 3 ];
							point.x += numbers[ j + 4 ];
							point.y += numbers[ j + 5 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 's':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
							path.bezierCurveTo(
								getReflection( point.x, control.x ),
								getReflection( point.y, control.y ),
								point.x + numbers[ j + 0 ],
								point.y + numbers[ j + 1 ],
								point.x + numbers[ j + 2 ],
								point.y + numbers[ j + 3 ]
							);
							control.x = point.x + numbers[ j + 0 ];
							control.y = point.y + numbers[ j + 1 ];
							point.x += numbers[ j + 2 ];
							point.y += numbers[ j + 3 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'q':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 4 ) {
							path.quadraticCurveTo(
								point.x + numbers[ j + 0 ],
								point.y + numbers[ j + 1 ],
								point.x + numbers[ j + 2 ],
								point.y + numbers[ j + 3 ]
							);
							control.x = point.x + numbers[ j + 0 ];
							control.y = point.y + numbers[ j + 1 ];
							point.x += numbers[ j + 2 ];
							point.y += numbers[ j + 3 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 't':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 2 ) {
							var rx = getReflection( point.x, control.x );
							var ry = getReflection( point.y, control.y );
							path.quadraticCurveTo(
								rx,
								ry,
								point.x + numbers[ j + 0 ],
								point.y + numbers[ j + 1 ]
							);
							control.x = rx;
							control.y = ry;
							point.x = point.x + numbers[ j + 0 ];
							point.y = point.y + numbers[ j + 1 ];
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					case 'a':
						var numbers = parseFloats( data );
						for ( var j = 0, jl = numbers.length; j < jl; j += 7 ) {
							var start = point.clone();
							point.x += numbers[ j + 5 ];
							point.y += numbers[ j + 6 ];
							control.x = point.x;
							control.y = point.y;
							parseArcCommand(
								path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
							);
							if ( j === 0 && doSetFirstPoint === true ) firstPoint.copy( point );
						}
						break;

					//

					case 'Z':
					case 'z':
						path.currentPath.autoClose = true;
						if ( path.currentPath.curves.length > 0 ) {
							// Reset point to beginning of Path
							point.copy( firstPoint );
							path.currentPath.currentPoint.copy( point );
							isFirstPoint = true;
						}
						break;

					default:
						console.warn( command );

				}

				// console.log( type, parseFloats( data ), parseFloats( data ).length  )

				doSetFirstPoint = false;

			}

			return path;

		}
		function parseArcCommand( path, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, start, end ) {

			x_axis_rotation = x_axis_rotation * Math.PI / 180;

			// Ensure radii are positive
			rx = Math.abs( rx );
			ry = Math.abs( ry );

			// Compute (x1′, y1′)
			var dx2 = ( start.x - end.x ) / 2.0;
			var dy2 = ( start.y - end.y ) / 2.0;
			var x1p = Math.cos( x_axis_rotation ) * dx2 + Math.sin( x_axis_rotation ) * dy2;
			var y1p = - Math.sin( x_axis_rotation ) * dx2 + Math.cos( x_axis_rotation ) * dy2;

			// Compute (cx′, cy′)
			var rxs = rx * rx;
			var rys = ry * ry;
			var x1ps = x1p * x1p;
			var y1ps = y1p * y1p;

			// Ensure radii are large enough
			var cr = x1ps / rxs + y1ps / rys;

			if ( cr > 1 ) {

				// scale up rx,ry equally so cr == 1
				var s = Math.sqrt( cr );
				rx = s * rx;
				ry = s * ry;
				rxs = rx * rx;
				rys = ry * ry;

			}

			var dq = ( rxs * y1ps + rys * x1ps );
			var pq = ( rxs * rys - dq ) / dq;
			var q = Math.sqrt( Math.max( 0, pq ) );
			if ( large_arc_flag === sweep_flag ) q = - q;
			var cxp = q * rx * y1p / ry;
			var cyp = - q * ry * x1p / rx;

			// Step 3: Compute (cx, cy) from (cx′, cy′)
			var cx = Math.cos( x_axis_rotation ) * cxp - Math.sin( x_axis_rotation ) * cyp + ( start.x + end.x ) / 2;
			var cy = Math.sin( x_axis_rotation ) * cxp + Math.cos( x_axis_rotation ) * cyp + ( start.y + end.y ) / 2;

			// Step 4: Compute θ1 and Δθ
			var theta = svgAngle( 1, 0, ( x1p - cxp ) / rx, ( y1p - cyp ) / ry );
			var delta = svgAngle( ( x1p - cxp ) / rx, ( y1p - cyp ) / ry, ( - x1p - cxp ) / rx, ( - y1p - cyp ) / ry ) % ( Math.PI * 2 );

			path.currentPath.absellipse( cx, cy, rx, ry, theta, theta + delta, sweep_flag === 0, x_axis_rotation );

		}

		function svgAngle( ux, uy, vx, vy ) {

			var dot = ux * vx + uy * vy;
			var len = Math.sqrt( ux * ux + uy * uy ) *  Math.sqrt( vx * vx + vy * vy );
			var ang = Math.acos( Math.max( -1, Math.min( 1, dot / len ) ) ); // floating point precision, slightly over values appear
			if ( ( ux * vy - uy * vx ) < 0 ) ang = - ang;
			return ang;

		}
		function parseRectNode( node, style ) {

			var x = parseFloat( node.getAttribute( 'x' ) || 0 );
			var y = parseFloat( node.getAttribute( 'y' ) || 0 );
			var rx = parseFloat( node.getAttribute( 'rx' ) || 0 );
			var ry = parseFloat( node.getAttribute( 'ry' ) || 0 );
			var w = parseFloat( node.getAttribute( 'width' ) );
			var h = parseFloat( node.getAttribute( 'height' ) );

			var path = new ShapePath();
			path.color.setStyle( style.fill );
			path.moveTo( x + 2 * rx, y );
			path.lineTo( x + w - 2 * rx, y );
			if ( rx !== 0 || ry !== 0 ) path.bezierCurveTo( x + w, y, x + w, y, x + w, y + 2 * ry );
			path.lineTo( x + w, y + h - 2 * ry );
			if ( rx !== 0 || ry !== 0 ) path.bezierCurveTo( x + w, y + h, x + w, y + h, x + w - 2 * rx, y + h );
			path.lineTo( x + 2 * rx, y + h );

			if ( rx !== 0 || ry !== 0 ) {

				path.bezierCurveTo( x, y + h, x, y + h, x, y + h - 2 * ry );

			}

			path.lineTo( x, y + 2 * ry );

			if ( rx !== 0 || ry !== 0 ) {

				path.bezierCurveTo( x, y, x, y, x + 2 * rx, y );

			}

			return path;

		}

		function parsePolygonNode( node, style ) {

			function iterator( match, a, b ) {

				var x = parseFloat( a );
				var y = parseFloat( b );

				if ( index === 0 ) {
					path.moveTo( x, y );
				} else {
					path.lineTo( x, y );
				}

				index ++;

			}

			var regex = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g;

			var path = new ShapePath();
			path.color.setStyle( style.fill );

			var index = 0;

			node.getAttribute( 'points' ).replace(regex, iterator);

			path.currentPath.autoClose = true;

			return path;

		}

		function parsePolylineNode( node, style ) {

			function iterator( match, a, b ) {

				var x = parseFloat( a );
				var y = parseFloat( b );

				if ( index === 0 ) {
					path.moveTo( x, y );
				} else {
					path.lineTo( x, y );
				}

				index ++;

			}

			var regex = /(-?[\d\.?]+)[,|\s](-?[\d\.?]+)/g;

			var path = new ShapePath();
			path.color.setStyle( style.fill );

			var index = 0;

			node.getAttribute( 'points' ).replace(regex, iterator);

			path.currentPath.autoClose = false;

			return path;

		}

		function parseCircleNode( node, style ) {

			var x = parseFloat( node.getAttribute( 'cx' ) );
			var y = parseFloat( node.getAttribute( 'cy' ) );
			var r = parseFloat( node.getAttribute( 'r' ) );

			var subpath = new Path();
			subpath.absarc( x, y, r, 0, Math.PI * 2 );

			var path = new ShapePath();
			path.color.setStyle( style.fill );
			path.subPaths.push( subpath );

			return path;

		}

		function parseEllipseNode( node, style ) {

			var x = parseFloat( node.getAttribute( 'cx' ) );
			var y = parseFloat( node.getAttribute( 'cy' ) );
			var rx = parseFloat( node.getAttribute( 'rx' ) );
			var ry = parseFloat( node.getAttribute( 'ry' ) );

			var subpath = new Path();
			subpath.absellipse( x, y, rx, ry, 0, Math.PI * 2 );

			var path = new ShapePath();
			path.color.setStyle( style.fill );
			path.subPaths.push( subpath );

			return path;

		}

		function parseLineNode( node, style ) {

			var x1 = parseFloat( node.getAttribute( 'x1' ) );
			var y1 = parseFloat( node.getAttribute( 'y1' ) );
			var x2 = parseFloat( node.getAttribute( 'x2' ) );
			var y2 = parseFloat( node.getAttribute( 'y2' ) );

			var path = new ShapePath();
			path.moveTo( x1, y1 );
			path.lineTo( x2, y2 );
			path.currentPath.autoClose = false;

			return path;

		}

		//

		function parseStyle( node, style ) {

			style = Object.assign( {}, style ); // clone style

			if ( node.hasAttribute( 'fill' ) ) style.fill = node.getAttribute( 'fill' );
			if ( node.style.fill !== '' ) style.fill = node.style.fill;

			return style;

		}

		function isVisible( style ) {

			return style.fill !== 'none' && style.fill !== 'transparent';

		}

		// http://www.w3.org/TR/SVG11/implnote.html#PathElementImplementationNotes

		function getReflection( a, b ) {

			return a - ( b - a );

		}

		function parseFloats( string ) {

			var array = string.split( /[\s,]+|(?=\s?[+\-])/ );

			for ( var i = 0; i < array.length; i ++ ) {

				var number = array[ i ];

				// Handle values like 48.6037.7.8
				// TODO Find a regex for this

				if ( number.indexOf( '.' ) !== number.lastIndexOf( '.' ) ) {

					var split = number.split( '.' );

					for ( var s = 2; s < split.length; s ++ ) {

						array.splice( i + s - 1, 0, '0.' + split[ s ] );

					}

				}

				array[ i ] = parseFloat( number );

			}

			return array;
		}

		function getNodeTransform( node ) {

			if ( ! node.hasAttribute( 'transform' ) ) {
				return null;
			}

			var transform = parseTransformNode( node );

			if ( transform ) {

				if ( transformStack.length > 0 ) {
					transform.premultiply( transformStack[ transformStack.length - 1 ] );
				}

				currentTransform.copy( transform );
				transformStack.push( transform );

			}

			return transform;

		}

		function parseTransformNode( node ) {

			var transform = new Matrix3();
			var currentTransform = tempTransform0;
			var transformsTexts = node.getAttribute( 'transform' ).split( ' ' );

			for ( var tIndex = transformsTexts.length - 1; tIndex >= 0; tIndex-- ) {

				var transformText = transformsTexts[ tIndex ];
				var openParPos = transformText.indexOf( "(" );
				var closeParPos = transformText.indexOf( ")" );

				if ( openParPos > 0 && openParPos < closeParPos ) {

					var transformType = transformText.substr( 0, openParPos );

					var array = parseFloats( transformText.substr( openParPos + 1, closeParPos - openParPos - 1 ) );

					currentTransform.identity();

					switch ( transformType ) {

						case "translate":

							if ( array.length >= 1 ) {

								var tx = array[ 0 ];
								var ty = tx;

								if ( array.length >= 2 ) {

									ty = array[ 1 ];

								}

								currentTransform.translate( tx, ty );

							}

							break;

						case "rotate":

							if ( array.length >= 1 ) {

								var angle = 0;
								var cx = 0;
								var cy = 0;

								// Angle
								angle = - array[ 0 ] * Math.PI / 180;

								if ( array.length >= 3 ) {

									// Center x, y
									cx = array[ 1 ];
									cy = array[ 2 ];

								}

								// Rotate around center (cx, cy)
								tempTransform1.identity().translate( -cx, -cy );
								tempTransform2.identity().rotate( angle );
								tempTransform3.multiplyMatrices( tempTransform2, tempTransform1 );
								tempTransform1.identity().translate( cx, cy );
								currentTransform.multiplyMatrices( tempTransform1, tempTransform3 );

							}

							break;

						case "scale":

							if ( array.length >= 1 ) {

								var scaleX = array[ 0 ];
								var scaleY = scaleX;

								if ( array.length >= 2 ) {
									scaleY = array[ 1 ];
								}

								currentTransform.scale( scaleX, scaleY );

							}

							break;

						case "skewX":

							if ( array.length === 1 ) {

								currentTransform.set(
									1, Math.tan( array[ 0 ] * Math.PI / 180 ), 0,
									0, 1, 0,
									0, 0, 1
								);

							}

							break;

						case "skewY":

							if ( array.length === 1 ) {

								currentTransform.set(
									1, 0, 0,
									Math.tan( array[ 0 ] * Math.PI / 180 ), 1, 0,
									0, 0, 1
								);

							}

							break;

						case "matrix":

							if ( array.length === 6 ) {

								currentTransform.set(
									array[ 0 ], array[ 2 ], array[ 4 ],
									array[ 1 ], array[ 3 ], array[ 5 ],
									0, 0, 1
								);

							}

							break;
					}

				}

				transform.premultiply( currentTransform );

			}

			return transform;

		}

		function transformPath( path, m ) {

			function transfVec2( v2 ) {

				tempV3.set( v2.x, v2.y, 1 ).applyMatrix3( m );

				v2.set( tempV3.x, tempV3.y );

			}

			var isRotated = isTransformRotated( m );

			var tempV2 = new Vector2();
			var tempV3 = new Vector3();

			var subPaths = path.subPaths;

			for ( var i = 0, n = subPaths.length; i < n; i++ ) {

				var subPath = subPaths[ i ];
				var curves = subPath.curves;

				for ( var j = 0; j < curves.length; j++ ) {

					var curve = curves[ j ];

					if ( curve.isLineCurve ) {

						transfVec2( curve.v1 );
						transfVec2( curve.v2 );

					} else if ( curve.isCubicBezierCurve ) {

						transfVec2( curve.v0 );
						transfVec2( curve.v1 );
						transfVec2( curve.v2 );
						transfVec2( curve.v3 );

					} else if ( curve.isQuadraticBezierCurve ) {

						transfVec2( curve.v0 );
						transfVec2( curve.v1 );
						transfVec2( curve.v2 );

					} else if ( curve.isEllipseCurve ) {

						if ( isRotated ) {
							console.warn( "SVGLoader: Elliptic arc or ellipse rotation or skewing is not implemented." );
						}

						tempV2.set( curve.aX, curve.aY );
						transfVec2( tempV2 );
						curve.aX = tempV2.x;
						curve.aY = tempV2.y;

						curve.xRadius *= getTransformScaleX( m );
						curve.yRadius *= getTransformScaleY( m );

					}

				}

			}

		}

		function isTransformRotated( m ) {
			return m.elements[ 1 ] !== 0 || m.elements[ 3 ] !== 0;
		}

		function getTransformScaleX( m ) {
			var te = m.elements;
			return Math.sqrt( te[ 0 ] * te[ 0 ] + te[ 1 ] * te[ 1 ] )
		}

		function getTransformScaleY( m ) {
			var te = m.elements;
			return Math.sqrt( te[ 3 ] * te[ 3 ] + te[ 4 ] * te[ 4 ] )
		}

		//

		console.log( 'SVGLoader' );

		var paths = [];

		var transformStack = [];

		var tempTransform0 = new Matrix3();
		var tempTransform1 = new Matrix3();
		var tempTransform2 = new Matrix3();
		var tempTransform3 = new Matrix3();

		var currentTransform = new Matrix3();

		console.time( 'SVGLoader: DOMParser' );

		var xml = new DOMParser().parseFromString( text, 'image/svg+xml' ); // application/xml

		console.timeEnd( 'SVGLoader: DOMParser' );

		console.time( 'SVGLoader: Parse' );

		parseNode( xml.documentElement, { fill: '#000' } );

		// console.log( paths );
		console.timeEnd( 'SVGLoader: Parse' );

		return paths;

	}

};

export { SVGLoader }
