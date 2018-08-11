//reducer that holds the current count of questions answers. This is use with the correctAnswerCount to determine the score
export default function questionAnsweredCount(state={"questionAnswered": 0}, action){
	switch(action.type){
		case 'addQuestionsAnswered':
			return {
				questionAnswered: state.questionAnswered + 1
			};
		default:
			return state;
	}
}