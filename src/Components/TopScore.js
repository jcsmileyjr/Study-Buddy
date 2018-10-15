import React from 'react';
import {connect} from 'react-redux';

let currentTopScore = null; //Set the top score to null to hide it if local storage is empty

//Check the local storage for a unique quiz key, if found then load the data to currentTopScore
function getTopScore(level){      
  //create a unique key for the current test and quiz level. Format name + Quiz + level
  const uniqueLocalStorageKey = "testQuiz" + level;
      
  if(localStorage.getItem(uniqueLocalStorageKey)){
    currentTopScore = localStorage.getItem(uniqueLocalStorageKey);//if true, load with local storage data
  }else{
    currentTopScore = null;//if false, set varible to false to hide the component
  }      
} 

//component at bottom of the app that shows the highest score the user has on this web browser for an quiz 
function TopScore(props){ 

getTopScore(props.currentQuizLevel.currentLevel);//method to get the highest score or null from local storage             
   if(currentTopScore  !== null){
    return(
     <div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
           Beat Your Highest Score {currentTopScore}
        </div>
     </div>
    );
    }else{
      return null
    }
}

 

/*Use Redux to get the current score from state*/
const mapStateToProps = state =>({
    currentQuizLevel: state.successPage
});

export default connect(mapStateToProps)(TopScore);