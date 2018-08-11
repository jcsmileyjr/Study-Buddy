import React from 'react';
import { StyleSheet, css } from 'aphrodite';
 
const styles = StyleSheet.create({
  whiteSpaceAboveElement:{
          margin: "10px"
  }     
});
 
function Motivation(props){
   return(
     <div className={`row ${css(styles.whiteSpaceAboveElement)}`}>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
           You are the Greatest Daughter Ever
        </div>
     </div>
    );
}
 
export default Motivation;