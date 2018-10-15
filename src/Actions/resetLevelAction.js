export const RESETLEVEL = 'resetLevel';
export function resetLevel(){
	return {
		type:"RESETLEVEL" //This tells the reducer to update the successPage state current quiz level to 1
	}
}