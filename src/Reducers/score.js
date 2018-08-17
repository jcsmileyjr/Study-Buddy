//reducer that holds the current count of questions answers. This is use with the correctAnswerCount to determine the score
export default function score(state={"score": 100}, {type, payload}){
	switch(type){
		case 'SCORE':
			return payload.score;
		default:
			return state;
	}
}