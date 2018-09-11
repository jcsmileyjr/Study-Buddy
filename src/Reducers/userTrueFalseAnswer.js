//reducer that holds the trueFalse state. This help determine if the user choice is correct. 
export default function currentUserTrueFalseAnswer(state={"truefalse": false, "trueFalseQuizAnswer":""}, {type, payload}){
	switch(type){
		case 'USERANSWERTRUE':
			return {
				truefalse: true, //Update the state to true 
                trueFalseQuizAnswer: state.trueFalseQuizAnswer
			};
		case 'USERANSWERFALSE':
			return {
				truefalse: false, //Reset the state to false 
                trueFalseQuizAnswer: state.trueFalseQuizAnswer
			};
		case 'UPDATETRUEFALSEQUIZANSWER':
			return {
				truefalse: state.truefalse, //Reset the state to false 
                trueFalseQuizAnswer: payload
			};		            
		default:
			return state;
	}
}