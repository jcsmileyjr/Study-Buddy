//reducer that holds the current count of correctly answer questions. This is use with the questionAnsweredCount to determine the score. The inital state is count = 0. 
export default function correctAnsweredCount(state ={"count": 0}, action){
	switch(action.type){
		case 'ADDCORRECTANSWER':
			return {
				count: state.count + 1 //adds one to the state
			};
		case 'RESETCORRECTANSWER':
			return {
				count: state.count = 0 //reset the state
			};            
		default:
			return state;
	}//end of switch
}