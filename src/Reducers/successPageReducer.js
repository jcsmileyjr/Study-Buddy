//reducer use to show or hide the Success component and to move the player from one level to the next. 
export default function successPage(state={"showSuccessPage": false, "currentLevel":1}, {type, payload}){
	switch(type){
		case 'SHOWSUCCESSPAGE':
			showSuccessPage: true //Update the state to true and show the success component.
        case 'HIDESUCCESSPAGE':
            showSuccessPage: false //Update the state to false and hide the correct and incorrect answers.
        case 'NEXTLEVEL':
            return currentL
            currentLevel: state.currentLevel + 1 //adds one to the state
		default:
			return state;
	}
}