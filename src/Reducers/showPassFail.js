//reducer that holds the current state of the showPassFail used to show  the CSS of correct and incorrect answers when the user press the checkAnswer button or hide the CSS when the user press the DoneButton. It also is use to show or hide the CheckAnswersButton and DoneButton components. 
export default function showPassFail(state={"passFail": false}, action){
	switch(action.type){
		case 'SHOWPASSFAIL':
			return {
				passFail: true //Update the state to true and show the correct and incorrect answers.
			};
		case 'HIDEPASSFAIL':
			return {
				passFail: false //Reset the state to false and hide the correct and incorrect answers.
			};			
		default:
			return state;
	}
}