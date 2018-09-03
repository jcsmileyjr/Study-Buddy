export const USERANSWERTRUE = 'userChooseTrue';
export function userChooseTrue(){
	return {
		type:"USERANSWERTRUE" //This tells the reducer to update the trueFalse state to true. This is use to determine in the level two quiz if the answer is correct. 
	}
}