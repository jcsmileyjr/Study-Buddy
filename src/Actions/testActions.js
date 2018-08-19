export const UPDATEANSWERPASSFAIL = 'updatePassFail';
export function updatePassFail(newTest){
	return {
		type:"UPDATEANSWERPASSFAIL",
		payload: newTest //returns a array to with an updated PassFail
	}
}