export const HIDEPASSFAIL = 'showCSSFail';
export function showCSSFail(){
	return {
		type:"HIDEPASSFAIL" //This tells the reducer to update the showPassFail state to False. This turns off the CSS of the answer list (From fail's red or pass's green to the normal black)
	}
}