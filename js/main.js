var input = "";
var currentInput = "";

$(document).ready(function(){
  $(".btn").click(function(event){
    // console.log(event);
    var singleInput = "";

    // console.log("click function works!!");
    singleInput = event.currentTarget.innerHTML;
    console.log(singleInput);
    var numberPattern = /\d|\./;
    var operatorPattern = /\+|\-|x|÷/;
    if (numberPattern.test(singleInput)) {
      console.log("it's a number or '.'");
    } else if (operatorPattern.test(singleInput)) {
      console.log("it's a math operator");
    } else if (singleInput === "AC") {
      console.log("it's AC mode");
    } else if (singleInput === "CE") {
      console.log("it's CE mode");
    } else if (singleInput === "=") {
      console.log("it's calculating mode");
    }
  });
});
