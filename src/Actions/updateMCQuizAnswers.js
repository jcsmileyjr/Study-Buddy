export const UPDATEMCQUIZANSWERS = 'updateMCQuizAnswer';
export function updateMCQuizAnswer(newAnswerArray){
	return {
		type:"UPDATEMCQUIZANSWERS",
		payload: newAnswerArray
	}
}