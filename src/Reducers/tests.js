//reducer that holds the arrayOfAnswers as the initial state of questions and answers.
export default function test(state=arrayOfAnswers, {type, payload}){
	switch(type){
		case 'UPDATEANSWERPASSFAIL':
			return payload;//When a user chosen a new answer, the state is updated with it.
		default:
			return state;
	}
}

const arrayOfAnswers = [
	{"question":"1 x 5","answer":"5", "passFail":"asking"},
	{"question":"2 x 5","answer":"10", "passFail":"asking"},
	{"question":"3 x 5","answer":"15", "passFail":"asking"},
	{"question":"4 x 5","answer":"20", "passFail":"asking"},
	{"question":"5 x 5","answer":"25", "passFail":"asking"}     
];