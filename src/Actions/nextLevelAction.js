export const NEXTLEVEL = 'goToNextLevel';
export function goToNextLevel(){
	return {
		type:"NEXTLEVEL" //This tells the reducer to update the successPage state current quiz level to one level higher
	}
}