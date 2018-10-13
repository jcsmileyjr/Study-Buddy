//reducer use to show or hide the Success component and to move the player from one level to the next. 
export default function successPage(state={"showSuccessPage": false, "currentLevel":2}, {type, payload}){
	switch(type){
		case 'SHOWSUCCESSPAGE':
			return {
				showSuccessPage: true, //Update the state to true and show the success component.
                currentLevel: state.currentLevel
			};            
        case 'HIDESUCCESSPAGE':
			return {
				showSuccessPage: false, //Update the state to false and hide the correct and incorrect answers.
                currentLevel: state.currentLevel
			};
        case 'NEXTLEVEL':
            return {
                showSuccessPage: state.showSuccessPage,
                currentLevel: state.currentLevel + 1 //adds one to the state
            };
		default:
			return state;
	}
}