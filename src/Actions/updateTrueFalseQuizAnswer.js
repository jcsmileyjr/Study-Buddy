export const UPDATETRUEFALSEQUIZANSWER = 'updateQuizAnswer';
export function updateQuizAnswer(newAnswer){
	return {
		type:"UPDATETRUEFALSEQUIZANSWER",
		payload: newAnswer
	}
}