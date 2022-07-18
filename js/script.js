// getting all request elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

// if start Quiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); // show info box
};

// if exit button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // hide info box
};

// if continue button clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); // hide info box
  quiz_box.classList.add("activeQuiz"); // show quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  result_box.classList.remove("activeResult");
  quiz_box.classList.add("activeQuiz");
  que_count = 0;
  que_numb = 1;
  timeValue = 15;
  widthValue = 0;
  userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);

  startTimer(timeValue);

  startTimerLine(widthValue);
  next_btn.style.display = "none";
};

quit_quiz.onclick = () => {
  window.location.reload();
};

// if next button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;

    showQuestions(que_count);
    queCounter(que_numb);

    startTimer(timeValue);

    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time left";
  } else {
    showResultBox();
  }
};

//getting questions and options from array
function showQuestions(index) {
  const que_text = document.querySelector(".que_text");

  let que_tag = `<span> ${questions[index].numb}. ${questions[index].question} </span>`;
  let option_tag = `
  <div class = "option">${questions[index].options[0]}<span></span></div>
  <div class = "option">${questions[index].options[1]}<span></span></div>
  <div class = "option">${questions[index].options[2]}<span></span></div>
  <div class = "option">${questions[index].options[3]}<span></span></div>`;
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>`;

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = option_list.children.length;

  if (userAns === correctAns) {
    userScore++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    // if answer is incorrect then automatically select the correct answer
    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  // once user selected diable all options
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox() {
  info_box.classList.remove("activeInfo"); // hide info box
  quiz_box.classList.remove("activeQuiz"); // hide quiz box
  result_box.classList.add("activeResult"); // show quiz box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag = `<span>and congrats! &#128513; You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag = `<span>and nice 	&#128515; You got <p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = `<span>and sorry &#128542; You got only<p>${userScore}</p>out of<p>${questions.length}</p></span>`;
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  timeCount.textContent = time;
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      let correctAns = questions[que_count].answer;
      let allOptions = option_list.children.length;

      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }

      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }

  counter = setInterval(timer, 1000);
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 1000);
  function timer() {
    time += 6.6;
    timeLine.style.width = time + "%";
    if (time > 100) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  const button_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag = `<span><p>${index}</p>of<p>${questions.length}</p>Questions</span>`;
  button_ques_counter.innerHTML = totalQuesCountTag;
}
