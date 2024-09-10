const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "What is the color of the sky?",
        answers: ["Blue", "Green", "Red", "Yellow"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    startTimer();

    document.getElementById("next-button").addEventListener("click", () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            const answerIndex = parseInt(selectedAnswer.value);
            if (answerIndex === questions[currentQuestionIndex].correct) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                endQuiz();
            }
        } else {
            alert("Please select an answer.");
        }
    });

    document.getElementById("restart-button").addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 60;
        document.getElementById("result").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";
        startTimer();
        loadQuestion();
    });
});

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    const answersList = document.getElementById("answers");
    answersList.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="radio" name="answer" value="${index}" id="answer${index}">
            <label for="answer${index}">${answer}</label>
        `;
        answersList.appendChild(li);
    });
}

function startTimer() {
    timer = setInterval(() => {
        document.getElementById("time").textContent = timeLeft;
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = `Your score: ${score}/${questions.length}`;
}
