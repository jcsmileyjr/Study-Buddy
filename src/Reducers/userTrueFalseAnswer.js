//reducer that holds the trueFalse state and the answer state for each view. This help determine if the user choice is correct. 
export default function currentUserTrueFalseAnswer(state={"truefalse": false, "trueFalseQuizAnswer":"", MCQuizAnswers:[]}, {type, payload}){
	switch(type){
		case 'USERANSWERTRUE':
			return {
				truefalse: true, //Update the state to true 
                trueFalseQuizAnswer: state.trueFalseQuizAnswer,
                MCQuizAnswers: state.MCQuizAnswers
                
			};
		case 'USERANSWERFALSE':
			return {
				truefalse: false, //Reset the state to false 
                trueFalseQuizAnswer: state.trueFalseQuizAnswer,
                MCQuizAnswers: state.MCQuizAnswers
			};
		case 'UPDATETRUEFALSEQUIZANSWER':
			return {
				truefalse: state.truefalse, //Reset the state to false 
                trueFalseQuizAnswer: payload,
                MCQuizAnswers: state.MCQuizAnswers
			};
        case 'UPDATEMCQUIZANSWERS':
            return {
                truefalse: state.truefalse, //Reset the state to false
                trueFalseQuizAnswer: state.trueFalseQuizAnswer,
                MCQuizAnswers: payload
            };
		default:
			return state;
	}
}