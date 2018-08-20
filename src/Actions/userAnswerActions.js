export const USERANSWER = 'getUserAnswer';
export function getUserAnswer(newAnswer){
	return {
		type:"USERANSWER",
		payload: {
			userAnswer: newAnswer	//returning a object, which was pass in as a parameter, to update the state. This is the user selected answer.
		}
	}
}