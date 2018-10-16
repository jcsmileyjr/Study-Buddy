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
	  listStyleType: "none",
  	  margin: "0px",
	  padding: "0px"
  }
});

const instructionsArray = [
      "Click an option to choose an answer!",
      "Click the 'Check Answer' button to submit!",
      "Press the 'Done' button to continue"
]; 

function Instructions(props){ 
    
  let currentArray = []    

  //function to create an array of instructions to be displayed
  function displayInstructions(level){
	
    if(level === 1){
        currentArray = instructionsArray;
    }  
      
    //create a array of instructions as <li> to be displayed. 
    const listOfInstructions = currentArray.map((instructions, index) =>
	  <li key={index}>
        <input  type="checkbox" defaultChecked />{instructions}                                            
	  </li>									   
    );
	
	return listOfInstructions;
  } 
   return(
     <div>
          <Modal show={props.show} onHide={props.hideMCInstructions}>
            <Modal.Header className={css(styles.orangeBackground)} closeButton>
              <Modal.Title>Multiple Choice Test</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h2 className={css(styles.centerText)}>Instructions</h2>
              <div className="text-left col-xs-11 col-xs-offset-1 col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-3 col-lg-8 col-lg-offset-3">
              <ul className={css(styles.removeListBullets)}>{displayInstructions(props.currentQuizLevel)}</ul>
              </div>
            </Modal.Body>
            <Modal.Footer className={css(styles.centerText)}>
              <Button className={css(styles.buttonTextColor)} bsStyle="warning" onClick={props.hideMCInstructions}>Close</Button>
            </Modal.Footer>
          </Modal>
     </div>
    );
}

/*Use Redux to get the current quiz level*/
const mapStateToProps = state =>({
    currentQuizLevel: state.successPage.currentLevel,    
});

export default connect(mapStateToProps)(Instructions);