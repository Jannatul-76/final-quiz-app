
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Osmium", "Ozone", "Oganesson"],
        correctAnswer: "Oxygen"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Platinum"],
        correctAnswer: "Diamond"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // Timer duration for each question in seconds

const questionContainer = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const congratsMessage = document.getElementById('congrats-message');
const timerElement = document.getElementById('timer');

function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(null, 'Time Up');
        }
    }, 1000);
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    answersContainer.innerHTML = '';
    timeLeft = 30; // Reset the timer for each question
    startTimer();

    currentQuestion.answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.classList.add('answer-btn');
        answerButton.onclick = () => handleAnswer(answerButton, answer);
        answersContainer.appendChild(answerButton);
    });

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    }
}

function handleAnswer(button, selectedAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // Disable all answer buttons after one is clicked
    const buttons = answersContainer.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    // If the answer is wrong, highlight the wrong answer in red
    if (selectedAnswer !== correctAnswer && selectedAnswer !== 'Time Up') {
        button.style.backgroundColor = 'red';
        button.style.color = 'white';
    }

    // Highlight the correct answer in green
    const correctButton = Array.from(buttons).find(btn => btn.textContent === correctAnswer);
    if (correctButton) {
        correctButton.style.backgroundColor = 'green';
        correctButton.style.color = 'white';
    }

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000); // Wait for 1 second before loading next question
    } else {
        setTimeout(displayResult, 1000); // Wait for 1 second before showing the result
    }
}

function displayResult() {
    document.getElementById('quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.textContent = score;

    // Add a congratulatory message based on score
    if (score === questions.length) {
        congratsMessage.textContent = "Congratulations! You completed the quiz with a perfect score!";
    } else {
        congratsMessage.textContent = "Congratulations! You completed the quiz!";
    }
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resultContainer.style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function exitQuiz() {
    window.location.href = 'https://www.example.com'; // Change this URL to your desired exit URL
}

nextButton.addEventListener('click', function () {
    nextButton.style.display = "none"; // "Start Quiz" will be hidden
    document.querySelector('h1').style.display = "none"; // "Welcome to the Quiz App" will be removed
    questionContainer.innerHTML = ""; // "Get ready for the quiz!" will be removed
    loadQuestion(); // Load the first question
});

submitButton.addEventListener('click', displayResult);

window.onload = loadQuestion;
