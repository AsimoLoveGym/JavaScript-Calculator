var input = "";
var currentInput = "";
var lastOperator = "";
var operatorPattern = /\+|\-|x|÷/;
var operatorPatternGlobal = /\+|\-|x|÷/g;

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event);
    var singleInput = "";
    // console.log("click function works!!");
    singleInput = event.currentTarget.innerHTML;
    var numberPattern = /\d|\./;

    if (numberPattern.test(singleInput)) {
      // console.log("it's a number or '.'");
      input += singleInput;
      currentInput += singleInput;
    } else if (operatorPattern.test(singleInput)) {
      // console.log("it's a math operator");
      lastOperator = singleInput;
      input += singleInput;
      currentInput = "";
    } else if (singleInput === "AC") {
      // console.log("it's AC mode");
      input = "";
      currentInput = "";
    } else if (singleInput === "CE") {
      var lastIndexOfOperator = input.lastIndexOf(lastOperator);
      input = input.slice(0, lastIndexOfOperator+1);
      currentInput = "";
    } else if (singleInput === "=") {
      // console.log("it's calculating mode");
      currentInput = calculating(input);
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
  // for Test
  equationString = "1+2x3-6÷2+5";
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
