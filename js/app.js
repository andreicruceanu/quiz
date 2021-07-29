const homeBox = document.querySelector(".home-box");
const quizNumber = document.querySelector(".quiz-number");
const quizText = document.querySelector(".quiz-question-text");
const optionContainer = document.querySelector(".option-quiz");
const answersIndicator = document.querySelector(".answers-indicator");
const quizBox = document.querySelector(".quiz-box");
const quizResult = document.querySelector(".quiz-result");
const NumberQuestionsTotal = document.querySelector("#numberQuestions");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOption = [];
let correctAnswers = 0;
let attempt = 0;

NumberQuestionsTotal.innerHTML = quiz.length;

function setAvailableQuestions() {
  for (let i = 0; i < quiz.length; i++) {
    availableQuestion.push(quiz[i]);
  }
  console.log(availableQuestion);
}
function getNewQuestion() {
  quizNumber.textContent = `Question ${questionCounter + 1} of ${quiz.length}`;

  const questionIndex =
    availableQuestion[Math.floor(Math.random() * availableQuestion.length)];
  currentQuestion = questionIndex;
  quizText.innerHTML = currentQuestion.q;
  console.log(questionIndex);

  const index1 = availableQuestion.indexOf(questionIndex);
  availableQuestion.splice(index1, 1);
  console.log(currentQuestion.option);

  const optionLen = currentQuestion.option.length;

  for (let i = 0; i < optionLen; i++) {
    availableOption.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.15;

  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOption[Math.floor(Math.random() * availableOption.length)];
    const index2 = availableOption.indexOf(optionIndex);
    availableOption.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.option[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay += 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

function getResult(element) {
  const id = parseInt(element.id);

  if (id === currentQuestion.answear) {
    element.classList.add("correct");
    updateAnswerIndication("correct");
    correctAnswers++;
    console.log("corecte: " + correctAnswers);
  } else {
    console.log("nu este corect ");
    element.classList.add("wrong");
    updateAnswerIndication("wrong");
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (
        parseInt(optionContainer.children[i].id) === currentQuestion.answear
      ) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOption();
}

function unclickableOption() {
  const optionLen = optionContainer.children.length;

  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answearIndicator() {
  answersIndicator.innerHTML = "";
  const totalQuiz = quiz.length;
  for (let i = 0; i < totalQuiz; i++) {
    const indicator = document.createElement("div");
    answersIndicator.appendChild(indicator);
  }
}

function updateAnswerIndication(markType) {
  answersIndicator.children[questionCounter - 1].classList.add(markType);
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  quizBox.classList.add("hidden");
  quizResult.classList.remove("hidden");
  quizResultAnswer();
}
function quizResultAnswer() {
  document.querySelector(".total-question").innerHTML = quiz.length;
  document.querySelector(".total-attempt").innerHTML = attempt;
  document.querySelector(".total-correct").innerHTML = correctAnswers;
  document.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percentageTotal = (correctAnswers / quiz.length) * 100;
  document.querySelector(".percentage").innerHTML = `${percentageTotal.toFixed(
    2
  )} %`;
  document.querySelector(
    ".total-score"
  ).innerHTML = `${correctAnswers} / ${quiz.length}`;
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainQuiz() {
  quizBox.classList.remove("hidden");
  quizResult.classList.add("hidden");
  resetQuiz();
  startQuiz();
}
function gotoHome() {
  quizResult.classList.add("hidden");
  homeBox.classList.remove("hidden");
  resetQuiz();
}

function startQuiz() {
  homeBox.classList.add("hidden");
  quizBox.classList.remove("hidden");

  setAvailableQuestions();
  getNewQuestion();
  answearIndicator();
}
