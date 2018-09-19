export const USERANSWERFALSE = 'userChooseFalse';
export function userChooseFalse(){
	return {
		type:"USERANSWERFALSE" //This tells the reducer to update the trueFalse state to false. This is use to determine in the level two quiz if the answer is correct. 
	}
}