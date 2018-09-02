export const SHOWSUCCESSPAGE = 'successPageTrue';
export function successPageTrue(){
	return {
		type:"SHOWSUCCESSPAGE" //This tells the reducer to update the successPage state to True. This allows the user to see a pass or fail message message before going to the next quiz
	}
}