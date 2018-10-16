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
      backgroundColor: 'orange'
  },
  
  buttonTextColor:{
	color: "black" //button text is black
  },

  //Add a blinking colors animation to the streak
  //tips @ https://awesomereact.com/playlists/style-your-app/BIpKF_CMhu8 and old Index Cards app    
  streakColor:{
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationName: {
      '0%':{color: "green"},
      '25%':{transform: "scale(1.05) rotate(4deg)"},    
      '50%':{color: "orange", transform: "scale(1.05) rotate(-4deg)"},
      '100%':{color: "navy"}
    }
  }    
	
});

//An permanent component that displays the current question from the test state. A book icon is use to repersent a link to a list of answers the user can view if need help.
class Question extends Component {
  constructor(props){
    super(props);
    this.state= {show:false};
  }
    
//create an array of answers to be display in the hints list when the user press the notpad icon by the question.
displayAllAnswers(){
    
  const allAnswers = this.props.question;//get array of questions and answers
    
  //create a new alphabetical sorted array with just the answers
  const newList = allAnswers.map(function(question){return question.answer}).sort();    
	
  //create an list array to be displayed in the hints pop up box    
  const listAllAnswers = newList.map((answers, index) =>
	<li className={css(styles.removeListBullets)} key={index}>
		<label>{answers}</label>				   
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
          {this.props.currentStreak >= 3 && <h4 className={css(styles.streakColor)}>STREAK {this.props.currentStreak}</h4>}
		  <h3>
	  	    {currentQuestion}
            
	  	    <span onClick={this.showListOfAnswers}>
	  		  <i className= {`fas fa-book ${css(styles.listOfAnswers)}`}></i>
		    </span>
            
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
	currentLocation: state.answered,
    currentStreak: state.streak.streak
});

export default connect(mapStateToProps)(Question);