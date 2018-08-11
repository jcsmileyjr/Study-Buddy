import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

import { StyleSheet, css } from 'aphrodite';

 

const styles = StyleSheet.create({

  whiteSpaceAboveElement:{

          margin: "10px"

  }    

});

 

class CheckAnswerButton extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
          <Button bsStyle="success">Check Answer</Button>
        </div>
      </div>
   );      //end of return
 }//end of render
 /*      To Do

- add attribute to disable={} if player hasn't chosen an answer

 - onclick={method to check if answer is corect}

  - onClick={method to change passFail of answers that in turn change css}

  - write both methods

 - bind both methods to the constructor

 */  

       

}//end of CheckAnswerButton Class

 

export default CheckAnswerButton;