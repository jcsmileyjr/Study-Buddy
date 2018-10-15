//reducer that holds the current streak, count of correct answers
export default function streak(state={"streak": 0}, action){
	switch(action.type){
		case 'ADDSTREAK':
			return {
				streak: state.streak + 1 //adds one to the current streak count.
			};
		case 'RESETSTREAK':
			return {
				streak: state.streak = 0 //reset the current streak count.
			};            
		default:
			return state;
	}
}