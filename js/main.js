var input = "";
var currentInput = "";
var lastOperator = "";

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event);
    var singleInput = "";
    // console.log("click function works!!");
    singleInput = event.currentTarget.innerHTML;
    var numberPattern = /\d|\./;
    var operatorPattern = /\+|\-|x|÷/;
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
  console.log("Calculating........");
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
