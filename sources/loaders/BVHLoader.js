//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { FileLoader } from './FileLoader.js'
import { Vector3 } from '../math/Vector3.js'
import { Quaternion } from '../math/Quaternion.js'
import { Bone } from '../objects/Bone.js'
import { VectorKeyframeTrack } from '../animation/tracks/VectorKeyframeTrack.js'
import { QuaternionKeyframeTrack } from '../animation/tracks/QuaternionKeyframeTrack.js'
import { AnimationClip } from '../animation/AnimationClip.js'
import { Skeleton } from '../objects/Skeleton.js'
import { DefaultLoadingManager } from './LoadingManager.js'
var BVHLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	this.animateBonePositions = true;
	this.animateBoneRotations = true;

};

BVHLoader.prototype = {

	constructor: BVHLoader,

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
		function readBvh( lines ) {

			// read model structure

			if ( nextLine( lines ) !== 'HIERARCHY' ) {

				console.error( 'BVHLoader: HIERARCHY expected.' );

			}

			var list = []; // collects flat array of all bones
			var root = readNode( lines, nextLine( lines ), list );

			// read motion data

			if ( nextLine( lines ) !== 'MOTION' ) {

				console.error( 'BVHLoader: MOTION expected.' );

			}

			// number of frames

			var tokens = nextLine( lines ).split( /[\s]+/ );
			var numFrames = parseInt( tokens[ 1 ] );

			if ( isNaN( numFrames ) ) {

				console.error( 'BVHLoader: Failed to read number of frames.' );

			}

			// frame time

			tokens = nextLine( lines ).split( /[\s]+/ );
			var frameTime = parseFloat( tokens[ 2 ] );

			if ( isNaN( frameTime ) ) {

				console.error( 'BVHLoader: Failed to read frame time.' );

			}

			// read frame data line by line

			for ( var i = 0; i < numFrames; i ++ ) {

				tokens = nextLine( lines ).split( /[\s]+/ );
				readFrameData( tokens, i * frameTime, root );

			}

			return list;

		}
		function readFrameData( data, frameTime, bone ) {

			// end sites have no motion data

			if ( bone.type === 'ENDSITE' ) return;

			// add keyframe

			var keyframe = {
				time: frameTime,
				position: new Vector3(),
				rotation: new Quaternion()
			};

			bone.frames.push( keyframe );

			var quat = new Quaternion();

			var vx = new Vector3( 1, 0, 0 );
			var vy = new Vector3( 0, 1, 0 );
			var vz = new Vector3( 0, 0, 1 );

			// parse values for each channel in node

			for ( var i = 0; i < bone.channels.length; i ++ ) {

				switch ( bone.channels[ i ] ) {

					case 'Xposition':
						keyframe.position.x = parseFloat( data.shift().trim() );
						break;
					case 'Yposition':
						keyframe.position.y = parseFloat( data.shift().trim() );
						break;
					case 'Zposition':
						keyframe.position.z = parseFloat( data.shift().trim() );
						break;
					case 'Xrotation':
						quat.setFromAxisAngle( vx, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					case 'Yrotation':
						quat.setFromAxisAngle( vy, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					case 'Zrotation':
						quat.setFromAxisAngle( vz, parseFloat( data.shift().trim() ) * Math.PI / 180 );
						keyframe.rotation.multiply( quat );
						break;
					default:
						console.warn( 'BVHLoader: Invalid channel type.' );

				}

			}

			// parse child nodes

			for ( var i = 0; i < bone.children.length; i ++ ) {

				readFrameData( data, frameTime, bone.children[ i ] );

			}

		}
		function readNode( lines, firstline, list ) {

			var node = { name: '', type: '', frames: [] };
			list.push( node );

			// parse node type and name

			var tokens = firstline.split( /[\s]+/ );

			if ( tokens[ 0 ].toUpperCase() === 'END' && tokens[ 1 ].toUpperCase() === 'SITE' ) {

				node.type = 'ENDSITE';
				node.name = 'ENDSITE'; // bvh end sites have no name

			} else {

				node.name = tokens[ 1 ];
				node.type = tokens[ 0 ].toUpperCase();

			}

			if ( nextLine( lines ) !== '{' ) {

				console.error( 'BVHLoader: Expected opening { after type & name' );

			}

			// parse OFFSET

			tokens = nextLine( lines ).split( /[\s]+/ );

			if ( tokens[ 0 ] !== 'OFFSET' ) {

				console.error( 'BVHLoader: Expected OFFSET but got: ' + tokens[ 0 ] );

			}

			if ( tokens.length !== 4 ) {

				console.error( 'BVHLoader: Invalid number of values for OFFSET.' );

			}

			var offset = new Vector3(
				parseFloat( tokens[ 1 ] ),
				parseFloat( tokens[ 2 ] ),
				parseFloat( tokens[ 3 ] )
			);

			if ( isNaN( offset.x ) || isNaN( offset.y ) || isNaN( offset.z ) ) {

				console.error( 'BVHLoader: Invalid values of OFFSET.' );

			}

			node.offset = offset;

			// parse CHANNELS definitions

			if ( node.type !== 'ENDSITE' ) {

				tokens = nextLine( lines ).split( /[\s]+/ );

				if ( tokens[ 0 ] !== 'CHANNELS' ) {

					console.error( 'BVHLoader: Expected CHANNELS definition.' );

				}

				var numChannels = parseInt( tokens[ 1 ] );
				node.channels = tokens.splice( 2, numChannels );
				node.children = [];

			}

			// read children

			while ( true ) {

				var line = nextLine( lines );

				if ( line === '}' ) {

					return node;

				} else {

					node.children.push( readNode( lines, line, list ) );

				}

			}

		}
		function toTHREEBone( source, list ) {

			var bone = new Bone();
			list.push( bone );

			bone.position.add( source.offset );
			bone.name = source.name;

			if ( source.type !== 'ENDSITE' ) {

				for ( var i = 0; i < source.children.length; i ++ ) {

					bone.add( toTHREEBone( source.children[ i ], list ) );

				}

			}

			return bone;

		}
		function toTHREEAnimation( bones ) {

			var tracks = [];

			// create a position and quaternion animation track for each node

			for ( var i = 0; i < bones.length; i ++ ) {

				var bone = bones[ i ];

				if ( bone.type === 'ENDSITE' )
					continue;

				// track data

				var times = [];
				var positions = [];
				var rotations = [];

				for ( var j = 0; j < bone.frames.length; j ++ ) {

					var frame = bone.frames[ j ];

					times.push( frame.time );

					// the animation system animates the position property,
					// so we have to add the joint offset to all values

					positions.push( frame.position.x + bone.offset.x );
					positions.push( frame.position.y + bone.offset.y );
					positions.push( frame.position.z + bone.offset.z );

					rotations.push( frame.rotation.x );
					rotations.push( frame.rotation.y );
					rotations.push( frame.rotation.z );
					rotations.push( frame.rotation.w );

				}

				if ( scope.animateBonePositions ) {

					tracks.push( new VectorKeyframeTrack( '.bones[' + bone.name + '].position', times, positions ) );

				}

				if ( scope.animateBoneRotations ) {

					tracks.push( new QuaternionKeyframeTrack( '.bones[' + bone.name + '].quaternion', times, rotations ) );

				}

			}

			return new AnimationClip( 'animation', - 1, tracks );

		}
		function nextLine( lines ) {

			var line;
			// skip empty lines
			while ( ( line = lines.shift().trim() ).length === 0 ) { }
			return line;

		}

		var scope = this;

		var lines = text.split( /[\r\n]+/g );

		var bones = readBvh( lines );

		var threeBones = [];
		toTHREEBone( bones[ 0 ], threeBones );

		var threeClip = toTHREEAnimation( bones );

		return {
			skeleton: new Skeleton( threeBones ),
			clip: threeClip
		};

	}

};

export { BVHLoader }
