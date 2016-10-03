var input = "";
var currentInput = "";
var lastOperator = "";
var operatorPattern = /\+|\-|x|÷/;
var operatorPatternGlobal = /\+|\-|x|÷/g;
var expectNumber = true;
var expectOperator = false;
var expectCalculating = false;
var afterCalculating = false;

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event);
    var singleInput = "";
    // console.log("click function works!!");
    singleInput = event.currentTarget.innerHTML;
    var numberPattern = /\d|\./;

    if (numberPattern.test(singleInput) && expectNumber) {
      // it's a number or '.'
      if (singleInput === "0" && currentInput.length === 0) {
        // Do nothing. Invalid input, no need to update input and currentInput
      } else if (singleInput === "." &&currentInput.indexOf(".") > -1) {
        // Do nothing. Invalid input, no need to update input and currentInput
      } else if (afterCalculating) {
        input = singleInput;
        currentInput = singleInput;
        afterCalculating = false;
        expectOperator = true;
        expectCalculating = true;
      } else {
        input += singleInput;
        currentInput += singleInput;
        expectOperator = true;
        expectCalculating = true;
      }
    } else if (operatorPattern.test(singleInput) && expectOperator && input !== ".") {
      // it's a math operator
      if (afterCalculating) {
        lastOperator = singleInput;
        input = currentInput;
        input += singleInput;
        currentInput = "";
        afterCalculating = false;
        expectOperator = false;
      } else {
        lastOperator = singleInput;
        input += singleInput;
        currentInput = "";
        expectOperator = false;
      }

    } else if (singleInput === "AC") {
      // it's AC mode
      // Reset all the control flags and initial values
      input = "";
      currentInput = "";
      lastOperator = "";
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
        expectOperator = false;
      } else if (operatorPattern.test(input.charAt(input.length-1))) {
        input = input.slice(0,input.length-1);
        expectOperator = true;
      }
      // var lastIndexOfOperator = input.lastIndexOf(lastOperator);
      // input = input.slice(0, lastIndexOfOperator+1);
      currentInput = "";

    } else if (singleInput === "=" && expectCalculating) {
      // console.log("it's calculating mode");
      if(operatorPattern.test(input)) {
        console.log("Calculating.....");
        currentInput = calculating(input);
        expectNumber = true;
        expectOperator = true;
        expectCalculating = false;
        afterCalculating = true;
      }
    }
    // console.log(input);
    // console.log(currentInput);

    display(input, currentInput);
  });
});

function calculating(equationString) {
  var numbersArray = [];
  var operatorsArray = [];
  var operatorsIndex = -1;
  var subStringOIndex = -1;
  var slicedString = "";
  var calculatingResult = 0;
  // for Test
  // equationString = "78+24x12-54+343+34";
  numbersArray = equationString.split(operatorPattern);
  console.log(numbersArray);

  operatorsIndex = equationString.search(operatorPattern);
  subStringOIndex = operatorsIndex;
  operatorsArray.push(equationString.charAt(operatorsIndex));
  // var num = 0;
  while (subStringOIndex>-1) {
    slicedString = equationString.slice(operatorsIndex+1);
    // console.log(equationString);
    // console.log(slicedString);
    subStringOIndex = slicedString.search(operatorPattern);
    if (subStringOIndex !== -1) {
      operatorsArray.push(slicedString.charAt(subStringOIndex));
    }
    // console.log(subStringOIndex);
    operatorsIndex += subStringOIndex+1;

    // console.log(operatorsIndex);
  }
  console.log(operatorsArray);
  // console.log("1+3: ",Number("1+3"));
  for(var i = 0; i < operatorsArray.length; i ++) {
    var num1 = Number(numbersArray[0]);
    numbersArray.shift();
    var num2 = Number(numbersArray[0]);
    numbersArray.shift();
    console.log("Before Calculating",numbersArray);

    // /\+|\-|x|÷/
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
    console.log(calculatingResult);
    numbersArray.unshift(calculatingResult);
    console.log("After Calculating",numbersArray);
    return calculatingResult;
  }
};

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
