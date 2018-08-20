export const CLEARANSWER = 'clearUserAnswer';
export function clearUserAnswer(){
	return {
		type:"CLEARANSWER",
		payload: {
			userAnswer: ""	//returns a blank object. This should reset the state. This is used to disable the CheckAnswerButton component.
		}
	}
}