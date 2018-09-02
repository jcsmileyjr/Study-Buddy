export const HIDESUCCESSPAGE = 'successPageFalse';
export function successPageFalse(){
	return {
		type:"HIDESUCCESSPAGE" //This tells the reducer to update the successPage state to False. This allows the user to go from the success page at the end of a quiz level to the next quiz level. 
	}
}