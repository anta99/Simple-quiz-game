var questions=[];
$(document).ready(function(){
  $.ajax({
    url: "https://opentdb.com/api.php?amount=10",
    async: false,
    success: function( result ) {
      questions=result.results;
      $("#loader").fadeOut();
    }
  })
  printQuestion();
  $("button").click(function(){
    checkAnswer();
  })
})
const questionHeader = document.getElementById("questionHeader");
const questionBody = document.getElementById("questionOptions");
let n = 0;
let data=0;
let questionNumber=1;
let numberCorrect=0;
let numberWrong=0;
function printQuestion() {
  const answersArray = questions[n].incorrect_answers.concat(questions[n].correct_answer);
  shuffle(answersArray);
  questionHeader.innerHTML = `<h1>${questions[n].question}</h1>`
  questionBody.innerHTML ="";
  answersArray.map(element => questionBody.innerHTML += `<li><input type="radio" name="answer" class="answer" value="${element}" data-number='${data++}' />${element}</li>`);
   n++;
   data=0;
  }
 function checkAnswer(){
  const answers=document.querySelectorAll("li");
  const checkedAnswer=document.querySelector('input[name="answer"]:checked');
  if(checkedAnswer==null){
    questionNumber++;
    numberWrong++;
    if(questionNumber>questions.length){
      alert("It`s over.Your scrore is "+numberCorrect+"/"+questions.length);
    }
    printQuestion();
    }
    if(checkedAnswer.value==questions[n-1].correct_answer){
     answers[checkedAnswer.dataset.number].classList.add("correct");
     console.log("Correct");
      numberCorrect++;
    }
    else{
      answers[checkedAnswer.dataset.number].classList.add("wrong");
      console.log("Wrong");
      numberWrong++;
    }
    questionNumber++;
    if(questionNumber>questions.length){
      alert("It`s over.Your scrore is "+numberCorrect+"/"+questions.length);
      n=0;
      questionNumber=1;
      numberCorrect=0;
      numberWrong=0;
    }
    setTimeout(printQuestion,500);
  }

  //Function to shuffle answers
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
