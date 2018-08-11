import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import { StyleSheet, css } from 'aphrodite';
 
const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px"
  }     
});
 
 
class DoneButton extends Component{
  constructor(props){
    super(props);
  }
        
  render(){
     return(
       <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
         <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
            <Button bsStyle="success">Done</Button>
         </div>
       </div> 
      );      //end of return
   }//end of render
/*      To Do
- onclick={method to addScore}
- onClick={method to go to next question}
- write both methods
- bind both methods to the constructor
*/  
        
}//end of DoneButton Class
 
export default DoneButton;