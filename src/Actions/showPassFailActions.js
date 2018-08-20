export const SHOWPASSFAIL = 'showCSSPass';
export function showCSSPass(){
	return {
		type:"SHOWPASSFAIL" //This tells the reducer to update the showPassFail state to True. This turns on the CSS of the answer list (From normal black to fail's red or pass's green)
	}
}