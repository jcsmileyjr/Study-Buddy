//reducer that holds the current score of the app. An "SCORE" action returns a object with the updated score. 
export default function score(state={"score": 100}, {type, payload}){
	switch(type){
		case 'SCORE':
			return payload;
		case 'CLEARSCORE':
			return payload;            
		default:
			return state;
	}
}