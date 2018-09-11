export const CLEARSCORE = 'clearScore';
export function clearScore(newScore){
	return {
		type:"CLEARSCORE",
		payload: {
			score: 0	//returning a score object to reset the score to 0
		}
	}
}