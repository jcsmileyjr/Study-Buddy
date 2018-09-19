//function to get the current answer of a list of questions/answers (as a parameter answers) to be use in the displayAnswers() function. Must have access to the Redux state "this.props.currentLocation.questionAnswered" to get location 
export const getCurrentAnswer = (location, answers) => {
	
  //current correct answer
  const currentCorrectAnswer = {"answer":answers[location].answer, "passFail":answers[location].passFail};

  return currentCorrectAnswer;	
}

//function to return an array of two randomize answers plus the correct answer. You must give it a array of questions/answer and the correct answer
export const getRandomThreeAnswers= (answers, correctAnswer) => {
	
  const currentTestAnswers = [];//an empty array to be hold the correct answer and two random incorrect answers	
	
  //create an array of answer objects based on a array given as a parameter. This new array of objects have the given array answer and current passFail. 
  const currentAnswerArray = answers.map(function(x){return {"answer":x.answer, "passFail":x.passFail}});
  
  //randomly pick the first answer. Keep if it doesn’t match the currentCorrectAnswer, re-pick if it matches the currentCorrectAnswer
  var firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  
  while(correctAnswer.answer===firstAnswer.answer){
     firstAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //randomly pick the second answer and keep if it doesn’t match the correct answer and first answer
  var secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  while(correctAnswer.answer===secondAnswer.answer || firstAnswer.answer === secondAnswer.answer){
     secondAnswer = currentAnswerArray[Math.floor(Math.random() * currentAnswerArray.length)];
  }

  //push all answers into the currentTestAnswers as an object with a second attribute as true or false
  currentTestAnswers.push(correctAnswer, firstAnswer, secondAnswer);
            
   //Shuffle the currentTestAnswers array
   var currentIndex = currentTestAnswers.length, temporayValue, randomIndex;
            
   while(0 !== currentIndex){
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex -= 1;
                
     temporayValue = currentTestAnswers[currentIndex];
     currentTestAnswers[currentIndex] = currentTestAnswers[randomIndex];
     currentTestAnswers[randomIndex] = temporayValue;
   }
 	
  return currentTestAnswers;	
}	