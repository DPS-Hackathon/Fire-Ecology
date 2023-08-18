const quizData = [
    {
        question: " What is the full form of ISRO?",
        a: "International Space Research Organisation",
        b: "Institute for Space Research and Observation",
        c: "Indian Space Research Organisation",
        d: "Indian Space and Research Observatory",
        correct: "c",
    },
    {
        question: " What is the full form of GSLV?",
        a: "General Satellite Lifting Vehicle",
        b: "Geosynchronous Satellite Launch Vehicle",
        c: "Geosynchronous Satellite Lifting Vehicle",
        d: "Geostar Satellite Launch Vehicle",
        correct: "b",

    },
    {
        question: " When was ISRO Established?",
        a: "Aug 15, 1969",
        b: "Jan 26, 1969",
        c: "Aug 15, 1948",
        d: "Jan 15, 1948",
        correct: "a",
    },
    {
        question: " ISRO is monitored directly under whom?",
        a: "President",
        b: "Aviation Minister",
        c: "Prime Minister",
        d: "None of the above",
        correct: "c",
    },
    {
        question: " Who is the first chairman of ISRO?",
        a: "Mylswamy Annadurai",
        b: "B.N. Suresh",
        c: "Vikram Sarabhai",
        d: "None of the above",
        correct: "c",
    },
    {
        question: " Where is the headquarters of ISRO?",
        a: "Bangalore",
        b: "Chennai",
        c: "Mumbai",
        d: "None of the above",
        correct: "a",
    },
    {
        question: " Which was the first satellite launched by ISRO?",
        a: "Kalpana-1",
        b: "Aryabhata",
        c: "Bhaskara",
        d: "None of the above",
        correct: "b",
    },
    {
        question: "What is the full form of IRNSS?",
        a: "Indian Regional Navigation Satellite System",
        b: "Indian Regional Navigation Solar System",
        c: "Indian Research Navigation Satellite System",
        d: "Indian Research Navigation Safety System",
        correct: "a",
    },
    {
        question: "In which place Dr Vikram Sarabhai Space Centre is located?",
        a: "Shriharikota",
        b: "Ahmedabad",
        c: "Bangalore",
        d: "Thiruvananthapuram",
        correct: "d",
    },
    {
        question: "Satish Dhawan Space Center located in which state?",
        a: "Kerala",
        b: "Andhra Pradesh",
        c: "Karnataka",
        d: "Tamil Nadu",
        correct: "b",
    },
    {
        question: "Who is the father of the atomic bomb (Totally a relevant question, just for fun)",
        a: "Lewis Strauss",
        b: "J. Robert Oppenheimer",
        c: "Robert Downy Jr.",
        d: "Cilian Murphy",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const b_text = document.getElementById("Labelb");
const c_text = document.getElementById("Labelc");
const d_text = document.getElementById("Labeld");
const a_text = document.getElementById("Labela");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;
let level = currentQuiz + 1;

const defaultColor = '#17337c';
const selectedColor = "#055b91";

const radios = document.getElementsByTagName("input")

const aBG = document.getElementById('aBG');
const bBG = document.getElementById('bBG');
const cBG = document.getElementById('cBG');
const dBG = document.getElementById('dBG');

const aRadio = document.getElementById('a')
const bRadio = document.getElementById('b')
const cRadio = document.getElementById('c')
const dRadio = document.getElementById('d')


aRadio.addEventListener('change', function () {
    console.log('yaa')
    if (aRadio.checked) {
        aBG.style.backgroundColor = selectedColor;
        bBG.style.backgroundColor = defaultColor;
        cBG.style.backgroundColor = defaultColor;
        dBG.style.backgroundColor = defaultColor;
    }

});

bRadio.addEventListener('change', function () {
    console.log('yaa')
    if (bRadio.checked) {
        aBG.style.backgroundColor = defaultColor;
        bBG.style.backgroundColor = selectedColor;
        cBG.style.backgroundColor = defaultColor;
        dBG.style.backgroundColor = defaultColor;
    }

});

cRadio.addEventListener('change', function () {
    console.log('yaa')
    if (cRadio.checked) {
        aBG.style.backgroundColor = defaultColor;
        bBG.style.backgroundColor = defaultColor;
        cBG.style.backgroundColor = selectedColor;
        dBG.style.backgroundColor = defaultColor;
    }

});

dRadio.addEventListener('change', function () {
    console.log('yaa')
    if (dRadio.checked) {
        aBG.style.backgroundColor = defaultColor;
        bBG.style.backgroundColor = defaultColor;
        cBG.style.backgroundColor = defaultColor;
        dBG.style.backgroundColor = selectedColor;
    }

});


const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
    aBG.style.backgroundColor = defaultColor;
    bBG.style.backgroundColor = defaultColor;
    cBG.style.backgroundColor = defaultColor;
    dBG.style.backgroundColor = defaultColor;

};

const getSelectedOption = () => {
    let answer;
    answerElements.forEach((answerElement) => {
        if (answerElement.checked) {
            answer = answerElement.id;
        }
    });
    return answer;
};

const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = "Q" + level + ": " + currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};

loadQuiz();

submitButton.addEventListener("click", () => {
    const answer = getSelectedOption();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) score++;
        // console.log(answer + " answer")
        // console.log(quizData[currentQuiz].correct)
        // console.log(score + "score")
        currentQuiz++;
        level++
        if (currentQuiz < quizData.length) loadQuiz();
        else {
            quiz.innerHTML = `
              <h2 class="fs-3 font-exo quizQuestion mb-5 ms-4">You answered ${score}/${quizData.length} questions correctly</h2>
              <button onclick="history.go(0)" class="btn btn-primary btn-quiz mt-5 ms-4 mb-4">Play Again</button>
          `
        }
    }
});
