//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { DefaultLoadingManager } from './LoadingManager.js'
import { FileLoader } from './FileLoader.js'
import { Node } from '../nodes/core/Node.js'
import { TempNode } from '../nodes/core/TempNode.js'
import { InputNode } from '../nodes/core/InputNode.js'
import { ConstNode } from '../nodes/core/ConstNode.js'
import { VarNode } from '../nodes/core/VarNode.js'
import { StructNode } from '../nodes/core/StructNode.js'
import { AttributeNode } from '../nodes/core/AttributeNode.js'
import { FunctionNode } from '../nodes/core/FunctionNode.js'
import { ExpressionNode } from '../nodes/core/ExpressionNode.js'
import { FunctionCallNode } from '../nodes/core/FunctionCallNode.js'
import { NodeLib } from '../nodes/core/NodeLib.js'
import { NodeUtils } from '../nodes/core/NodeUtils.js'
import { NodeFrame } from '../nodes/core/NodeFrame.js'
import { NodeUniform } from '../nodes/core/NodeUniform.js'
import { NodeBuilder } from '../nodes/core/NodeBuilder.js'
import { BoolNode } from '../nodes/inputs/BoolNode.js'
import { IntNode } from '../nodes/inputs/IntNode.js'
import { FloatNode } from '../nodes/inputs/FloatNode.js'
import { Vector2Node } from '../nodes/inputs/Vector2Node.js'
import { Vector3Node } from '../nodes/inputs/Vector3Node.js'
import { Vector4Node } from '../nodes/inputs/Vector4Node.js'
import { ColorNode } from '../nodes/inputs/ColorNode.js'
import { Matrix3Node } from '../nodes/inputs/Matrix3Node.js'
import { Matrix4Node } from '../nodes/inputs/Matrix4Node.js'
import { TextureNode } from '../nodes/inputs/TextureNode.js'
import { CubeTextureNode } from '../nodes/inputs/CubeTextureNode.js'
import { ScreenNode } from '../nodes/inputs/ScreenNode.js'
import { ReflectorNode } from '../nodes/inputs/ReflectorNode.js'
import { PropertyNode } from '../nodes/inputs/PropertyNode.js'
import { RTTNode } from '../nodes/inputs/RTTNode.js'
import { UVNode } from '../nodes/accessors/UVNode.js'
import { ColorsNode } from '../nodes/accessors/ColorsNode.js'
import { PositionNode } from '../nodes/accessors/PositionNode.js'
import { NormalNode } from '../nodes/accessors/NormalNode.js'
import { CameraNode } from '../nodes/accessors/CameraNode.js'
import { LightNode } from '../nodes/accessors/LightNode.js'
import { ReflectNode } from '../nodes/accessors/ReflectNode.js'
import { ScreenUVNode } from '../nodes/accessors/ScreenUVNode.js'
import { ResolutionNode } from '../nodes/accessors/ResolutionNode.js'
import { MathNode } from '../nodes/math/MathNode.js'
import { OperatorNode } from '../nodes/math/OperatorNode.js'
import { CondNode } from '../nodes/math/CondNode.js'
import { NoiseNode } from '../nodes/procedural/NoiseNode.js'
import { CheckerNode } from '../nodes/procedural/CheckerNode.js'
import { TextureCubeUVNode } from '../nodes/misc/TextureCubeUVNode.js'
import { TextureCubeNode } from '../nodes/misc/TextureCubeNode.js'
import { NormalMapNode } from '../nodes/misc/NormalMapNode.js'
import { BumpMapNode } from '../nodes/misc/BumpMapNode.js'
import { BypassNode } from '../nodes/utils/BypassNode.js'
import { JoinNode } from '../nodes/utils/JoinNode.js'
import { SwitchNode } from '../nodes/utils/SwitchNode.js'
import { TimerNode } from '../nodes/utils/TimerNode.js'
import { VelocityNode } from '../nodes/utils/VelocityNode.js'
import { UVTransformNode } from '../nodes/utils/UVTransformNode.js'
import { MaxMIPLevelNode } from '../nodes/utils/MaxMIPLevelNode.js'
import { SpecularMIPLevelNode } from '../nodes/utils/SpecularMIPLevelNode.js'
import { ColorSpaceNode } from '../nodes/utils/ColorSpaceNode.js'
import { SubSlotNode } from '../nodes/utils/SubSlotNode.js'
import { BlurNode } from '../nodes/effects/BlurNode.js'
import { ColorAdjustmentNode } from '../nodes/effects/ColorAdjustmentNode.js'
import { LuminanceNode } from '../nodes/effects/LuminanceNode.js'
import { RawNode } from '../nodes/materials/nodes/RawNode.js'
import { SpriteNode } from '../nodes/materials/nodes/SpriteNode.js'
import { PhongNode } from '../nodes/materials/nodes/PhongNode.js'
import { StandardNode } from '../nodes/materials/nodes/StandardNode.js'
import { MeshStandardNode } from '../nodes/materials/nodes/MeshStandardNode.js'
import { NodeMaterial } from '../nodes/materials/NodeMaterial.js'
import { SpriteNodeMaterial } from '../nodes/materials/SpriteNodeMaterial.js'
import { PhongNodeMaterial } from '../nodes/materials/PhongNodeMaterial.js'
import { StandardNodeMaterial } from '../nodes/materials/StandardNodeMaterial.js'
import { MeshStandardNodeMaterial } from '../nodes/materials/MeshStandardNodeMaterial.js'
import { NodePostProcessing } from '../nodes/postprocessing/NodePostProcessing.js'

/**
 * @author sunag / http://www.sunag.com.br/
 */
var Nodes = {
	Node:Node,
	TempNode:TempNode,
	InputNode:InputNode,
	ConstNode:ConstNode,
	VarNode:VarNode,
	StructNode:StructNode,
	AttributeNode:AttributeNode,
	FunctionNode:FunctionNode,
	ExpressionNode:ExpressionNode,
	FunctionCallNode:FunctionCallNode,
	NodeLib:NodeLib,
	NodeUtils:NodeUtils,
	NodeFrame:NodeFrame,
	NodeUniform:NodeUniform,
	NodeBuilder:NodeBuilder,
	BoolNode:BoolNode,
	IntNode:IntNode,
	FloatNode:FloatNode,
	Vector2Node:Vector2Node,
	Vector3Node:Vector3Node,
	Vector4Node:Vector4Node,
	ColorNode:ColorNode,
	Matrix3Node:Matrix3Node,
	Matrix4Node:Matrix4Node,
	TextureNode:TextureNode,
	CubeTextureNode:CubeTextureNode,
	ScreenNode:ScreenNode,
	ReflectorNode:ReflectorNode,
	PropertyNode:PropertyNode,
	RTTNode:RTTNode,
	UVNode:UVNode,
	ColorsNode:ColorsNode,
	PositionNode:PositionNode,
	NormalNode:NormalNode,
	CameraNode:CameraNode,
	LightNode:LightNode,
	ReflectNode:ReflectNode,
	ScreenUVNode:ScreenUVNode,
	ResolutionNode:ResolutionNode,
	MathNode:MathNode,
	OperatorNode:OperatorNode,
	CondNode:CondNode,
	NoiseNode:NoiseNode,
	CheckerNode:CheckerNode,
	TextureCubeUVNode:TextureCubeUVNode,
	TextureCubeNode:TextureCubeNode,
	NormalMapNode:NormalMapNode,
	BumpMapNode:BumpMapNode,
	BypassNode:BypassNode,
	JoinNode:JoinNode,
	SwitchNode:SwitchNode,
	TimerNode:TimerNode,
	VelocityNode:VelocityNode,
	UVTransformNode:UVTransformNode,
	MaxMIPLevelNode:MaxMIPLevelNode,
	SpecularMIPLevelNode:SpecularMIPLevelNode,
	ColorSpaceNode:ColorSpaceNode,
	SubSlotNode:SubSlotNode,
	BlurNode:BlurNode,
	ColorAdjustmentNode:ColorAdjustmentNode,
	LuminanceNode:LuminanceNode,
	RawNode:RawNode,
	SpriteNode:SpriteNode,
	PhongNode:PhongNode,
	StandardNode:StandardNode,
	MeshStandardNode:MeshStandardNode,
	NodeMaterial:NodeMaterial,
	SpriteNodeMaterial:SpriteNodeMaterial,
	PhongNodeMaterial:PhongNodeMaterial,
	StandardNodeMaterial:StandardNodeMaterial,
	MeshStandardNodeMaterial:MeshStandardNodeMaterial,
	NodePostProcessing:NodePostProcessing
}
var NodeMaterialLoader = function ( manager, library ) {

	this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;

	this.nodes = {};
	this.materials = {};
	this.passes = {};
	this.names = {};
	this.library = library || {};

};

var NodeMaterialLoaderUtils = {

	replaceUUIDObject: function ( object, uuid, value, recursive ) {

		recursive = recursive !== undefined ? recursive : true;

		if ( typeof uuid === "object" ) uuid = uuid.uuid;

		if ( typeof object === "object" ) {

			var keys = Object.keys( object );

			for ( var i = 0; i < keys.length; i ++ ) {

				var key = keys[ i ];

				if ( recursive ) {

					object[ key ] = this.replaceUUIDObject( object[ key ], uuid, value );

				}

				if ( key === uuid ) {

					object[ uuid ] = object[ key ];

					delete object[ key ];

				}

			}

		}

		return object === uuid ? value : object;

	},

	replaceUUID: function ( json, uuid, value ) {

		this.replaceUUIDObject( json, uuid, value, false );
		this.replaceUUIDObject( json.nodes, uuid, value );
		this.replaceUUIDObject( json.materials, uuid, value );
		this.replaceUUIDObject( json.passes, uuid, value );
		this.replaceUUIDObject( json.library, uuid, value, false );

		return json;

	}

};

Object.assign( NodeMaterialLoader.prototype, {

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new FileLoader( scope.manager );
		loader.setPath( scope.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( JSON.parse( text ) ) );

		}, onProgress, onError );

		return this;

	},

	setPath: function ( value ) {

		this.path = value;
		return this;

	},

	getObjectByName: function ( uuid ) {

		return this.names[ uuid ];

	},

	getObjectById: function ( uuid ) {

		return this.library[ uuid ] ||
			this.nodes[ uuid ] ||
			this.materials[ uuid ] ||
			this.passes[ uuid ] ||
			this.names[ uuid ];

	},

	getNode: function ( uuid ) {

		var object = this.getObjectById( uuid );

		if ( ! object ) {

			console.warn( "Node \"" + uuid + "\" not found." );

		}

		return object;

	},

	resolve: function ( json ) {

		switch ( typeof json ) {

			case "boolean":
			case "number":

				return json;

			case "string":

				if ( /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/i.test( json ) || this.library[ json ] ) {

					return this.getNode( json );

				}

				return json;

			default:

				if ( Array.isArray( json ) ) {

					for ( var i = 0; i < json.length; i ++ ) {

						json[ i ] = this.resolve( json[ i ] );

					}

				} else {

					for ( var prop in json ) {

						if ( prop === "uuid" ) continue;

						json[ prop ] = this.resolve( json[ prop ] );

					}

				}

		}

		return json;

	},

	declare: function ( json ) {

		var uuid, node, object;

		for ( uuid in json.nodes ) {

			node = json.nodes[ uuid ];

			object = new Nodes[ node.nodeType + "Node" ]();

			if ( node.name ) {

				object.name = node.name;

				this.names[ object.name ] = object;

			}

			this.nodes[ uuid ] = object;

		}

		for ( uuid in json.materials ) {

			node = json.materials[ uuid ];

			object = new Nodes[ node.type ]();

			if ( node.name ) {

				object.name = node.name;

				this.names[ object.name ] = object;

			}

			this.materials[ uuid ] = object;

		}

		for ( uuid in json.passes ) {

			node = json.passes[ uuid ];

			object = new Nodes[ node.type ]();

			if ( node.name ) {

				object.name = node.name;

				this.names[ object.name ] = object;

			}

			this.passes[ uuid ] = object;

		}

		if ( json.material ) this.material = this.materials[ json.material ];

		if ( json.pass ) this.pass = this.passes[ json.pass ];

		return json;

	},

	parse: function ( json ) {

		var uuid;

		json = this.resolve( this.declare( json ) );

		for ( uuid in json.nodes ) {

			this.nodes[ uuid ].copy( json.nodes[ uuid ] );

		}

		for ( uuid in json.materials ) {

			this.materials[ uuid ].copy( json.materials[ uuid ] );

		}

		for ( uuid in json.passes ) {

			this.passes[ uuid ].copy( json.passes[ uuid ] );

		}

		return this.material || this.pass || this;

	}

} );

export {
	NodeMaterialLoader,
	NodeMaterialLoaderUtils
}
