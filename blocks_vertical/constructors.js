'use strict';

goog.provide('Blockly.Blocks.constructors');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['constructors_int'] = {
	init: function(){
		this.jsonInit({
			message0: "int %1",
			args0: [{
				type: "input_value",
				name: "INT"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}

Blockly.Blocks['constructors_float'] = {
	init: function(){
		this.jsonInit({
			message0: "float %1",
			args0: [{
				type: "input_value",
				name: "FLOAT"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}

Blockly.Blocks['constructors_vec2_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec2 %1",
			args0: [{
				type: "input_value",
				name: "X"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec2_2'] = {
	init: function(){
		this.jsonInit({
			message0: "vec2 %1 %2",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}

Blockly.Blocks['constructors_vec3_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec3 %1",
			args0: [{
				type: "input_value",
				name: "X"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec3_2'] = {
	init: function(){
		this.jsonInit({
			message0: "vec3 %1 %2",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec3_3'] = {
	init: function(){
		this.jsonInit({
			message0: "vec3 %1 %2 %3",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			},{
				type: "input_value",
				name: "Z"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}

Blockly.Blocks['constructors_vec4_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec4 %1",
			args0: [{
				type: "input_value",
				name: "X"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec4_2'] = {
	init: function(){
		this.jsonInit({
			message0: "vec4 %1 %2",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec4_3'] = {
	init: function(){
		this.jsonInit({
			message0: "vec4 %1 %2 %3",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			},{
				type: "input_value",
				name: "Z"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}
Blockly.Blocks['constructors_vec4_4'] = {
	init: function(){
		this.jsonInit({
			message0: "vec4 %1 %2 %3 %4",
			args0: [{
				type: "input_value",
				name: "X"
			},{
				type: "input_value",
				name: "Y"
			},{
				type: "input_value",
				name: "Z"
			},{
				type: "input_value",
				name: "W"
			}],
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_number"]
		});
	}
}