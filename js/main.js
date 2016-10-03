var input = "";
var currentInput = "";
// var lastOperator = "";
var operatorPattern = /\+|\-|x|÷/;
// Initia input in a calculator is always a number
var expectNumber = true;
var expectOperator = false;
var expectCalculating = false;
// afterCalculating flag would be used in calculating result utilization
// if you'd like to further work on a result, input operator
// if you'd like to start a new calculation, input a number; previous result will be removed.
var afterCalculating = false;

// ********************** Below for dealing with Input ************************
$(document).ready(function(){
  $(".btn").click(function(event){
    var singleInput = "";
    singleInput = event.currentTarget.innerHTML;
    var numberPattern = /\d|\./;

    if (numberPattern.test(singleInput) && expectNumber) {
      // The input is a number or '.'
      if (singleInput === "0" && currentInput.length === 0) {
        // In the case the first input is 0, it's a number without meaning
        // Do nothing. Invalid input, no need to update input and currentInput
      } else if (singleInput === "." &&currentInput.indexOf(".") > -1) {
        // If current number is already the one with point, meaningless to have two point in a number
        // So, ignore this point
        // Do nothing. Invalid input, no need to update input and currentInput
      } else if (afterCalculating) {
        // remove the previous calculating result
        // start a new calculation
        input = singleInput;
        currentInput = singleInput;
        afterCalculating = false;
        expectOperator = true;
        expectCalculating = true;
        if (currentInput === ".") {
          // a point "." is not a complete number for calculating
          expectCalculating = false;
        }

      } else {
        // valid input, update the First Line Display & Second Line Display
        // Second Line Display updating
        input += singleInput;
        // First Line Display updating
        currentInput += singleInput;
        // already have a valid number in expression, ready for operator
        expectOperator = true;
        // ready for calculating
        expectCalculating = true;
        if (currentInput === ".") {
          // a point "." is not a complete number for calculating
          expectCalculating = false;
        }
      }
    } else if (operatorPattern.test(singleInput) && expectOperator && currentInput !== ".") {
      // The input is a math operator
      // The expectOperator should be turned on
      // The number waiting for operator should not be a single "point"
      if (afterCalculating) {

        // lastOperator = singleInput;
        // The currentInput value is previous calculation result
        // give the input with the result value for further falculating
        input = currentInput;
        // update the input value with the operator just input
        input += singleInput;
        // reset the currentInput value
        currentInput = "";
        // reset the afterCalculating value
        afterCalculating = false;
        // once input with just one operator, we need a number to be followed
        expectOperator = false;
      } else {
        // lastOperator = singleInput;
        // update the input value with the operator just input
        input += singleInput;
        // reset the currentInput value
        currentInput = "";
        // once input with just one operator, we need a number to be followed
        expectOperator = false;
      }

    } else if (singleInput === "AC") {
      // it's AC mode
      // Reset all the control flags and initial values
      input = "";
      currentInput = "";
      // lastOperator = "";
      expectNumber = true;
      expectOperator = false;
      expectCalculating = false;
      afterCalculating = false;
    } else if (singleInput === "CE") {
      // if last character of input is number, remove the number until a operator is at the end.
      if(numberPattern.test(input.charAt(input.length-1))) {
        // keep slice the input until met the operator
        while (numberPattern.test(input.charAt(input.length-1))){
          input = input.slice(0,input.length-1);
        }
        // since last input number has been removed, we expect a new number
        expectOperator = false;
      } else if (operatorPattern.test(input.charAt(input.length-1))) {
        // if last character of input is operator, remove it
        input = input.slice(0,input.length-1);
        expectOperator = true;
      }
      // Reset the currentInput
      currentInput = "";
    } else if (singleInput === "=" && expectCalculating) {
      // it's calculating mode
      // expectCalculating flag is on, this is always set to be on with a valid number input
      // But in a special case I, the calculating is not necessary
      // if it's just one number without operator, no need to calculating;


      if(operatorPattern.test(input)) {
        // calculating is valid when
        // First, operator existed in input
        console.log("Calculating.....");
        currentInput = calculating(input);
        // after calculating, reset all the important flags
        expectNumber = true;
        expectOperator = true;
        expectCalculating = false;
        afterCalculating = true;
      }
    }
    // after dealing with the singleInput
    // currentInput value and input value has been updated
    // display them in the display unit
    display(input, currentInput);
  });
});
// ********************** Above for dealing with Input ************************

// ********************** Below for calculating ************************
function calculating(equationString) {
  var numbersArray = [];
  var operatorsArray = [];
  var operatorsIndex = -1;
  var subStringOIndex = -1;
  var slicedString = "";
  var calculatingResult = 0;
  // for fast Test
  // equationString = "78+24x12-54+343+34";
  // split the equationString, and grap the numbers into an array
  numbersArray = equationString.split(operatorPattern);
  // for testing
  // console.log(numbersArray);

  // String.search() is always started from the begining
  // and always stoped at the first matcher
  operatorsIndex = equationString.search(operatorPattern);
  // index in substring for operator
  subStringOIndex = operatorsIndex;
  // extract the operator into an arrays like the number arrays
  operatorsArray.push(equationString.charAt(operatorsIndex));
  // keep extract operators if substring has operators
  while (subStringOIndex>-1) {
    slicedString = equationString.slice(operatorsIndex+1);
    // for testing
    // console.log(equationString);
    // console.log(slicedString);
    subStringOIndex = slicedString.search(operatorPattern);
    if (subStringOIndex !== -1) {
      // operator found in the subString
      operatorsArray.push(slicedString.charAt(subStringOIndex));
    }
    // for testing
    // console.log(subStringOIndex);
    // update operatorsIndex value
    operatorsIndex += subStringOIndex+1;
    // for testing
    // console.log(operatorsIndex);
  }
  // for testing
  // console.log(operatorsArray);
  // console.log("1+3: ",Number("1+3"));
numbersArray
  // Calculating with extracted operatorsArray and numbersArray
  // there are how many operators in operatorsArray, there should be the same
  // number of calculating exist.
  for(var i = 0; i < operatorsArray.length; i ++) {
    // extract the number from numbersArray, ready for calculating
    var num1 = Number(numbersArray[0]);
    // removed the number has been utilized
    numbersArray.shift();
    var num2 = Number(numbersArray[0]);
    numbersArray.shift();
    // console.log("Before Calculating",numbersArray);

    // Different calculating with different operators
    switch (operatorsArray[i]){
      case "+":
        calculatingResult = num1 + num2;
        break;
      case "-":
        calculatingResult = num1 - num2;
        break;
      case "x":
        calculatingResult = num1 * num2;
        break;
      case "÷":
        calculatingResult = num1 / num2;
        break;
    }
    // console.log(calculatingResult);
    // console.log("After Calculating",numbersArray);
    return calculatingResult;
  }
};
// ********************** Above for calculating ************************

// ********************** Below for displaying ************************
function display(secondDisplay, mainDisplay){
  if(secondDisplay === "") {
    secondDisplay = "0";
  }
  if(mainDisplay === "") {
    mainDisplay = "0";
  }
  $("#main-display").html(mainDisplay);
  $("#second-display").html(secondDisplay);
}
// ********************** Above for displaying ************************
