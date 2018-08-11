//reducer that holds the current count of correctly answer questions. This is use with the questionAnsweredCount to determine the score 
export default function correctAnsweredCount(state ={"count": 0}, action){
	switch(action.type){
		case 'addScore':
			return {
				count: state.count + 1
			};
		default:
			return state;
	}//end of switch
}