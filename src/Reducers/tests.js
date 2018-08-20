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
	{"question":"What is the color of an Apple?","answer":"Red", "passFail":"asking"},
	{"question":"What is the color of an Banana?","answer":"Yellow", "passFail":"asking"},
	{"question":"What is the color of an Grape?","answer":"Purple", "passFail":"asking"},
	{"question":"What is the color of an Orange?","answer":"Orange", "passFail":"asking"},
	{"question":"What is the color of an Watermelon?","answer":"Green", "passFail":"asking"}
];