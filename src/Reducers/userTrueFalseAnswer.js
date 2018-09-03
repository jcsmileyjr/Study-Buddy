//reducer that holds the trueFalse state. This help determine if the user choice is correct. 
export default function currentUserTrueFalseAnswer(state={"truefalse": false}, action){
	switch(action.type){
		case 'USERANSWERTRUE':
			return {
				truthFalse: true //Update the state to true 
			};
		case 'USERANSWERFALSE':
			return {
				truthFalse: false //Reset the state to false 
			};			
		default:
			return state;
	}
}