//reducer that holds the current state of the showPassFail used to show  the CSS of correct and incorrect answers when the user press teh checkAnswer button
export default function showPassFail(state={"passFail": false}, action){
	switch(action.type){
		case 'SHOWPASSFAIL':
			return {
				passFail: true
			};
		case 'HIDEPASSFAIL':
			return {
				passFail: false
			};			
		default:
			return state;
	}
}