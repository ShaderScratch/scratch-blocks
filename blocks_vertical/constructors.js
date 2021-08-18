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
				name: "INT",
				check: ["int", "float"]
			}],
			output: "int",
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_numberlike"]
		});
	}
}

Blockly.Blocks['constructors_float'] = {
	init: function(){
		this.jsonInit({
			message0: "float %1",
			args0: [{
				type: "input_value",
				name: "FLOAT",
				check: ["int", "float"]
			}],
			output: "float",
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_numberlike"]
		});
	}
}

Blockly.Blocks['constructors_vec2_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec2 %1",
			args0: [{
				type: "input_value",
				name: "ARG0",
				check: ["int", "float"]
			}],
			output: "vec2",
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_numberlike"]
		});
	}
}

Blockly.Blocks['constructors_vec3_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec3 %1",
			args0: [{
				type: "input_value",
				name: "ARG0",
				check: ["int", "float"]
			}],
			output: "vec3",
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_numberlike"]
		});
	}
}

Blockly.Blocks['constructors_vec4_1'] = {
	init: function(){
		this.jsonInit({
			message0: "vec4 %1",
			args0: [{
				type: "input_value",
				name: "ARG0",
				check: ["int", "float"]
			}],
			output: "vec4",
			category: Blockly.Categories.constructors,
			extensions: ["colours_constructors", "output_numberlike"]
		});
	}
}

for (let n of [2,3,4]){
	Blockly.Blocks[`constructors_vec${n}_${n}`] = {
		init: function(){
			this.jsonInit({
				message0: `vec${n} ${Array.from({length:n},(x,i)=>`%${i+1}`).join(" ")}`,
				args0: Array.from(new Array(n).keys(),k=>({
					type: "input_value",
					name: "ARG"+k,
					check: ["int","float",...Array.from({length:n-k-1},(x,i)=>[`ivec${i+2}`,`vec${i+2}`])].flat()
				})),
				output: "vec"+n,
				category: Blockly.Categories.constructors,
				extensions: ["colours_constructors", "output_numberlike"]
			});
		},
		onchange(event){
			if (event.newParentId===this.id){
				let block = this.workspace.getBlockById(event.blockId);
				let type = block?block.outputConnection.getCheck()[0]:null;
				let floatsInType = type[type.length-1]*1||1;
				let inputIndex = this.getInputWithBlock(block).name.slice(3)*1;
				// removes all further inputs occupied by this block
				for (let i=inputIndex+1;i<inputIndex+floatsInType;i++){
					this.removeInput("ARG"+i,true);
				}
				// creates all inputs after that that don't already exist and appends them all to this block
				for (var i=inputIndex+floatsInType;i<n&&this.getInput("ARG"+i)===null;i++){
					let newInputShadow = this.workspace.newBlock("math_float");
					newInputShadow.setShadow(true);
					this.appendValueInput("ARG"+i).setCheck(["int","float"]).connection.connect(newInputShadow.outputConnection);
					newInputShadow.initSvg();
					newInputShadow.render();
				}
				// moves the inputs created above to their correct place
				if (i<n){
					for (let j=inputIndex+floatsInType;j<i;j++){
						this.moveInputBefore("ARG"+j,"ARG"+i);
					}
				}
				// updates all type checks
				for (let i=0;i<n;i++){
					let input = this.getInput("ARG"+i);
					if (input){
						for (var maxFloatsHere=1;i+maxFloatsHere<n&&maxFloatsHere<4;maxFloatsHere++){
							let input2 = this.getInput("ARG"+(i+maxFloatsHere));
							if (input2&&!input2.connection.targetBlock().isShadow()){
								break;
							}
						}
						input.setCheck(["int","float",...Array.from({length:maxFloatsHere-1},(x,i)=>[`ivec${i+2}`,`vec${i+2}`])].flat());
					}
				}
			}
		}
	}
}