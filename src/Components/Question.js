import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

//add some coloring to the listOfAnswers icon that will display a list of answers
const styles = StyleSheet.create({
    
  /*remove the bullets and indention from the lists displaying the cases*/
  removeListBullets: {
	  listStyleType: "none",
      textAlign: "center",
  	  margin: "0px",
	  padding: "0px"
  },
    
  listOfAnswers:{
	  backgroundColor: 'white',
	  color: 'orange'
  },
    
  orangeBackground:{
      textAlign: "center",      
      backgroundColor: '#FFCC80'
  },
  
  buttonTextColor:{
	color: "black" //button text is black
  }    
	
});

//An permanent component that displays the current question from the test state. A book icon is use to repersent a link to a list of answers the user can view if need help.
class Question extends Component {
  constructor(props){
    super(props);
    this.state= {show:false};
  }
    

displayAllAnswers(){
    
  const allAnswers = this.props.question;
	
  const listAllAnswers = allAnswers.map((answers, index) =>
	<li className={css(styles.removeListBullets)} key={index}>
		<label>{answers.answer}</label>				   
	</li>									   
  );
	
	return listAllAnswers;
   
}    
    

  showListOfAnswers = () =>{
    this.setState({show: true});
  }
  
  hideListOfAnswers = () =>{
    this.setState({show: false});
  }  
    
  render(){
      
	//get the list of questions and answers from the test reducer
	const listOfQuestions = this.props.question;
	
	//get the current count of questions answered from the questionAnswered reducer
	const location = this.props.currentLocation.questionAnswered;

	//determine the current question to be displayed based on the number of questions previously answered. 
    const currentQuestion = listOfQuestions[location].question; 
      
    return(
      <div className="row text-center">
	    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		  <h3>
	  	    {currentQuestion}
            <Button>
	  	    <span onClick={this.showListOfAnswers}>
	  		  <i className= {`fas fa-book ${css(styles.listOfAnswers)}`}></i>
		    </span>
            </Button>
		  </h3>
          <Modal show={this.state.show} onHide={this.hideListOfAnswers}>
            <Modal.Header className={css(styles.orangeBackground)} closeButton>
              <Modal.Title>List of Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.displayAllAnswers()}
            </Modal.Body>
            <Modal.Footer className={css(styles.orangeBackground)}>
              <Button className={css(styles.buttonTextColor)} bsStyle="success" onClick={this.hideListOfAnswers}>Close</Button>
            </Modal.Footer>
          </Modal>
	    </div>		
	  </div>  
    );
  }
}

/*Use Redux to get the current list of questions/answers and number of questions answered*/
const mapStateToProps = state =>({
	question: state.test,
	currentLocation: state.answered
});

export default connect(mapStateToProps)(Question);