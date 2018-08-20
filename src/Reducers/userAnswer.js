//reducer that holds the user answer to the current quesiton. The inital state is userAnswer = "". 
export default function currentUserAnswer(state={"userAnswer": ""}, {type, payload}){
	switch(type){
		case 'USERANSWER':
			return payload;//When a user chosen a new answer, the state is updated with it.
		case 'CLEARANSWER':
			return payload;//When a user press the DoneButton, the state is reset to "". This is use to disable the CheckAnswerButton component.
		default:
			return state;
	}
}