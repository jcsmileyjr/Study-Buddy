import React from 'react';
import { StyleSheet, css } from 'aphrodite';

//array of positive feedback to be displayed to the user
const positiveFeedBack = ["Good Job, Baby", "Besides chocolate, you are my favorite", "You are doing a Awesome job", "I love  you", "You can do it", "Get that A, Get that A", "You are the Best", "Super-smart, that's what you are", "Please Lord, help this child of mine", "If you need help, come get me", "I turned out liking you a lot more than I originally planned", "Good friends don't let you do stupid things...alone"];
 
const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px"
  }     
});

function Motivation({currentLocation}){

  //Retrieve a random feedback to be displayed    
  const motivation =  positiveFeedBack[Math.floor(Math.random() * positiveFeedBack.length)];   
             
   return(
     <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
           {motivation}
        </div>
     </div>
    );
}

export default Motivation;