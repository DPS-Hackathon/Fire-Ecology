const quizData = [
        {
        question: "According to the 'Fire Triangle' chapter in a Class 6 physics book, what are the three components that contribute to forest fires?",
        a: "Fuel, humidity, and sunlight",
        b: "Heat, water, and oxygen",
        c: "Fuel, heat, and oxygen",
        d: "Wind, vegetation, and heat",
        correct: "c"
        },
        {
        question: "In the context of forest fires, how did Vikas Ujjwal address the 'fuel' aspect to prevent fires in Jharkhand's Lohardaga district?",
        a: "He installed advanced firefighting equipment",
        b: "He focused on controlling wind patterns",
        c: "He converted dry leaves into eco-friendly briquettes",
        d: "He established ecotourism initiatives",
        correct: "c"
        },
        {
        question: "What positive impacts did the installation of the briquette plant have on the village and its people?",
        a: "It led to an increase in wood cutting",
        b: "It resulted in economic prosperity and fire prevention",
        c: "It caused major forest fires in the region",
        d: "It contributed to an increase in illegal activities",
        correct: "b"
        },
        {
        question: "In what way did the Great Fire of London in 1666 impact urban planning and development?",
        a: "It prompted the adoption of regulations for wider streets and brick construction",
        b: "It led to the abandonment of cities",
        c: "It encouraged the construction of wooden buildings",
        d: "It resulted in the prohibition of fire use for developmental purposes",
        correct: "a"
        },
        {
        question: "How have indigenous cultures, particularly in Australia, historically used fire as a tool for development?",
        a: "To destroy vegetation and promote desertification",
        b: "To create barriers against human settlements",
        c: "To intentionally manage vegetation and promote fresh growth",
        d: "To accelerate urban expansion",
        correct: "c"
        },
        {
        question: "What lesson did the 2018 Camp Fire in California emphasize regarding development in fire-prone areas?",
        a: "The importance of reducing firebreaks",
        b: "The need for stricter regulations on controlled burns",
        c: "The necessity of land-use planning, early warning systems, and community engagement",
        d: "The irrelevance of urban expansion in fire-prone regions",
        correct: "c"
        },
        {
        question: "In the Yellowstone National Park case study, what role did fire play in shaping the landscape?",
        a: "It resulted in permanent devastation and loss of biodiversity",
        b: "It eradicated all animal habitats",
        c: "It created a diverse mosaic of habitats at different stages of succession",
        d: "It led to the extinction of animal species",
        correct: "c"
        },
        {
        question: "How did certain bird species that relied on snags for nesting respond to the fire in Yellowstone?",
        a: "They became extinct",
        b: "They adapted by utilizing burnt trees for nesting",
        c: "They abandoned the park and migrated to other areas",
        d: "They relied on humans for nesting sites",
        correct: "b"
        },
        {
        question: "What long-term impact did fire-driven changes have on the Yellowstone landscape?",
        a: "It resulted in a permanent reduction of biodiversity",
        b: "It led to the abandonment of the park by animals",
        c: "It created a mosaic of habitats that enhanced biodiversity and ecosystem resilience",
        d: "It caused all animals to migrate away from the park",
        correct: "c"
        },
        {
        question: "What did the fires of Yellowstone teach ecologists and wildlife managers about fire's role in shaping animal habitats?",
        a: "Fires have no impact on animal habitats",
        b: "Fires only benefit herbivores",
        c: "Fire knowledge is irrelevant to understanding animal habitats",
        d: "Fire can shape landscapes, influence animal behaviors, and contribute to biodiversity",
        correct: "d"
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
