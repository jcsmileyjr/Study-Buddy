import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
import {connect} from 'react-redux';

//add some coloring to the listOfAnswers icon that will display a list of answers
const styles = StyleSheet.create({
  listOfAnswers:{
	  backgroundColor: 'white',
	  color: 'orange'
  }	
	
});

//An permanent component that displays the current question from the test state. A book icon is use to repersent a link to a list of answers the user can view if need help.
class Question extends Component {
  constructor(props){
    super(props);
    this.state= {show:false};
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
            <Modal.Header closeButton>
              <Modal.Title>List of Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
            </Modal.Body>
            <Modal.Footer>
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