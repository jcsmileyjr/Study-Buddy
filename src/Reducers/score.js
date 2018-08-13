//reducer that holds the current count of questions answers. This is use with the correctAnswerCount to determine the score
export default function score(state={"score": 100}, action){
	switch(action.type){
		case 'SCORE':
			return {
				score: 1
			};
		default:
			return state;
	}
}