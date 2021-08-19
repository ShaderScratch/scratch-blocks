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
};

(()=>{
	for (let n of [2,3,4]){
		Blockly.Blocks[`constructors_vec${n}_1`] = {
			init: function(){
				this.jsonInit({
					message0: `vec${n} %1`,
					args0: [{
						type: "input_value",
						name: "ARG0",
						check: ["int", "float"]
					}],
					output: `vec${n}`,
					category: Blockly.Categories.constructors,
					extensions: ["colours_constructors", "output_numberlike"]
				});
			}
		};
		Blockly.Blocks[`constructors_vec${n}_${n}`] = createDynamicFloatsConstructor(n,`vec${n}`);
		for (let m of [2,3,4]){
			Blockly.Blocks[`constructors_mat${n==m?n:n+"x"+m}_1`] = {
				init: function(){
					this.jsonInit({
						message0: `mat${n==m?n:n+"x"+m} %1`,
						args0: [{
							type: "input_value",
							name: "ARG0",
							check: ["int", "float",...[2,3,4].map(n=>[2,3,4].map(m=>`mat${n==m?n:n+"x"+m}`)).flat()]
						}],
						output: `mat${n==m?n:n+"x"+m}`,
						category: Blockly.Categories.constructors,
						extensions: ["colours_constructors", "output_numberlike"]
					});
				}
			};
			Blockly.Blocks[`constructors_mat${n==m?n:n+"x"+m}_${n*m}`] = createDynamicFloatsConstructor(n*m,`mat${n==m?n:n+"x"+m}`);
		}
	}
	/**
	 * Creates a block that takes n floats as inputs that can also be grouped together as vectors,
	 * like `vec4(float,vec2,float)`
	 * @param {number} n
	 * @param {string} name
	 */
	function createDynamicFloatsConstructor(n,name){
		return {
			/** @this Blockly.Block */
			init: function(){
				this.jsonInit({
					message0: `${name} ${range(1,n+1).map(i=>`%${i}`).join(" ")}`,
					args0: range(0,n).map(k=>({
						type: "input_value",
						name: "ARG"+k,
						check: ["int","float",...range(2,n-k+1).map(i=>[`ivec${i}`,`vec${i}`]).flat()]
					})),
					output: name,
					category: Blockly.Categories.constructors,
					extensions: ["colours_constructors", "output_numberlike"]
				});
			},
			/** @this Blockly.Block */
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
							input.setCheck(["int","float",...range(2,maxFloatsHere+1).map(n=>[`ivec${n}`,`vec${n}`])].flat());
						}
					}
				}
			}
		};
	}
	/**
	 * Array of whole numbers from start to end, with the end not included.
	 * @param {number} start
	 * @param {number} end
	 */
	function range(start,end){
		return Array.from({length:end-start},(x,i)=>i+start);
	}
})();