//reducer that holds the current count of questions answers. This is use with the correctAnswerCount to determine the score
export default function questionAnsweredCount(state={"questionAnswered": 0}, action){
	switch(action.type){
		case 'ADDQUESTIONANSWERED':
			return {
				questionAnswered: state.questionAnswered + 1 //adds one to the current count of questions answered.
			};
		default:
			return state;
	}
}