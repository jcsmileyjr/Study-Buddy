import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  //add whitespace between the radio button and the answer
  //Can't get this to work
  indentAnswerOptions:{
	  textIndent: "5%"
  },
    
  //add background color and center text of the header  
  orangeBackground:{
      textAlign: "center",      
      backgroundColor: 'orange'
  },
  
  //add color to the close button and whitespace above it    
  buttonTextColor:{
	color: "black", //button text is black
    marginTop: "20px"
  },
    
  //center the text or element    
  centerText:{
      textAlign: "center",
      borderTop: "0px none"//bug: remove a thin grey line that is noticeable in the body.
  },    
	
  /*remove the bullets and indention from the lists displaying the cases*/
  removeListBullets: {
	  listStyleType: "square",
  	  margin: "0px",
	  padding: "0px"
  },
    
  marginBtwButtons:{
      marginLeft: "20px"
  }
});

const MCArray = [
      "Click an option to choose an answer!",
      "Click the 'Check Answer' button to submit!",
      "Press the 'Done' button to continue",
      "Tip: Click on the orange notepad to see a list of answers"
];

const TFArray = [
      "Click True if the anwer is correct, false if incorrect!",
      "Click the 'Check Answer' button to submit!",
      "Press the 'Done' button to continue",
      "Tip: Click on the orange notepad to see a list of answers"
];

const FBArray = [
      "Type in your answer!",
      "Click the 'Check Answer' button to submit!",
      "You decide if your anwer is correct or incorrect",
      "Press the 'Done' button to continue",
      "Tip: Click on the orange notepad to see a list of answers"
];

let enableInstructions = true; //Use to disable instructions



function Instructions(props){ 
    
//Check the local storage for a unique quiz key, if found then load the data to currentTopScore
function checkdisableInstructions(){      
  
  const disable = "disableInstructions";
      
  if(localStorage.getItem(disable)){
    enableInstructions = localStorage.getItem(disable);//if true, load with local storage data
  }else{
    enableInstructions = true;//if false, set varible to false to hide the component
  }      
}

//EnableInstructions is set at true. If the user press the "Do not show Instructions" button, enableInstructins is set to false and save to local storage.
function doNotShowInstructions(){   
   
  //Save the new false variable to local storage    
  localStorage.setItem("disableInstructions", false);
    
  props.hideMCInstructions()//close the pop up instructions    
}    
    
  let currentArray = [];//holds the current instruction array based on quiz level
    
  let currentTitle = "";//hlds the current pop up title baed on quiz level    

  //function to create an array of instructions to be displayed
  function displayInstructions(level){
	
    if(level === 1){
        currentArray = MCArray;
    }else if(level === 2){
        currentArray = TFArray;
    }else {
        currentArray = FBArray;
    }
        
    //create a array of instructions as <li> to be displayed. 
    const listOfInstructions = currentArray.map((instructions, index) =>
	  <li key={index}>
        {instructions}                                            
	  </li>									   
    );
	
	return listOfInstructions;
  }
    
  //functin to get a title for the pop up based on the current quiz level    
  function getCurrentTitle(level){
    if(level === 1){
        currentTitle = "Multiple Choice Test";
    }else if(level === 2){
        currentTitle = "True or False Test";
    }else{
        currentTitle = "Fill in the Blank Test";
    }
      
    return currentTitle;  
  }
  
  if(enableInstructions === true){ 
    checkdisableInstructions();  
   return(
     <div>
          <Modal show={props.show} onHide={props.hideMCInstructions}>
            <Modal.Header className={css(styles.orangeBackground)} closeButton>
              <Modal.Title>{getCurrentTitle(props.currentQuizLevel)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2 className={css(styles.centerText)}>Instructions</h2>
              <div className="text-left col-xs-11 col-xs-offset-1 col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-3 col-lg-8 col-lg-offset-3">
              <ul className={css(styles.removeListBullets)}>{displayInstructions(props.currentQuizLevel)}</ul>
              </div>
            </Modal.Body>
            <Modal.Footer className={css(styles.centerText)}>
              <Button className={css(styles.buttonTextColor)} bsStyle="warning" onClick={props.hideMCInstructions}>Close</Button>
              {props.currentQuizLevel === 3 && <Button className={css(styles.buttonTextColor, styles.marginBtwButtons)} bsStyle="danger" onClick={doNotShowInstructions}>Do not show Instructions</Button>}
            </Modal.Footer>
          </Modal>
     </div>
    );
  }else{
      return null
    }
}

/*Use Redux to get the current quiz level*/
const mapStateToProps = state =>({
    currentQuizLevel: state.successPage.currentLevel,    
});

export default connect(mapStateToProps)(Instructions);