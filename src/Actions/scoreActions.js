export const SCORE = 'updateScore';
export function updateScore(newScore){
	return {
		type:"SCORE",
		payload: {
			score: newScore	//returning a score object which was pass in as a parameter
		}
	}
}