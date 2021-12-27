/**
 * Läs mer om JavaScript här:
 * https://www.w3schools.com/js/default.asp
 * 
 * För att se loggarna, tryck på F12 när du har webbläsaren öppen.
 * Läs mer om loggar här: 
 * https://www.w3schools.com/jsref/met_console_log.asp
 * 
 * Läs mer om funktioner här: 
 * https://www.w3schools.com/js/js_functions.asp
 * 
 * Tips på labbar:
 * 1) Använd console.log()-metoden och se vilka data du kan få ut och vad som händer i programmet.
 * 2) Ändra något värde och se vad som händer, t.ex. px-värdena i CSS:en (25px, 15px och 10px).
 * 3) Byt språk (se engelska ordet och svara med det svenska ordet), titta på variablerna questionHeader och answerHeader.
 * 4) Lägg till egna glosor (gör egna filer med glosor och ladda in dem).
 * 
 * Tips på vidareutveckling:
 * 1) Gör applikationen finare och lättare att använda t.ex. via CSS; 
 *      - ändra färg på resultattexten beroende på om svaret är rätt eller fel
 *      - centrera innehållet
 *      - ändra textstorlekar
 *      - o.s.v.
 * 2) Lägg till fler språk.
 * 3) Lägg till en knapp som byter vilket språk man vill träna på.
 * 
 */

const question = document.getElementById("question");
const userAnswer = document.getElementById("userAnswer");
const result = document.getElementById("result");

const btnPrevious = document.getElementById("btnPrevious");
const btnCheckAnswer = document.getElementById("btnCheckAnswer");
const btnNext = document.getElementById("btnNext");
const btnLoadUrlFile = document.getElementById("btnLoadUrlFile");

let questions;
let currentQuestionIndex;
let currentQuestion;

btnPrevious.innerText = "<--";
btnNext.innerText = "-->";

const questionHeader = "svenska";
const answerHeader = "engelska";

/**
 * Ladda in en fil med glosor via länk (URL).
 * 
 * @param {string} url Länk till en textfil med CSV-formaterat innehåll.
 */
function loadFileFromURL(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log("loadFileFromURL, data:" + data);
            questions = csvToArray(data);

            setUp();
        }
        );
}

/**
 * Ladda in en fil med glosor från datorn.
 */
function loadFileFromComputer() {
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        console.log('API:erna för filhantering är inte fullt stödda i denna webbläsare.');
        return;
    }

    computerFile = document.querySelector('#computer_file');

    if (!computerFile.files) {
        console.log("Webbläsaren verkar inte stödja 'files'-property.");
    } else if (!computerFile.files[0]) {
        console.log("Ingen fil vald.");
    } else {
        let file = computerFile.files[0];

        let fileReader = new FileReader();
        fileReader.onload = receivedText;
        fileReader.readAsText(file);

        function receivedText() {
            console.log("loadFileFromComputer, data:" + fileReader.result);
            questions = csvToArray(fileReader.result);

            setUp();
        }
    }
}

/**
 * Konvertera den laddade filens innehåll till en map array.
 * Läs mer om array här: https://www.w3schools.com/js/js_arrays.asp
 * Läs mer om map array här: https://www.w3schools.com/jsref/jsref_map.asp
 * 
 * @param {string} stringContent CSV-formatterad text.
 */
function csvToArray(stringContent) {
    stringContent = stringContent.replace(/\r|\r/g, "");

    const delimiter = ",";

    const headers = stringContent.slice(0, stringContent.indexOf("\n")).split(delimiter);
    const rows = stringContent.slice(stringContent.indexOf("\n") + 1).split("\n").slice(0, -1);

    const array = rows.map(function (row) {
        const values = row.split(delimiter);
        const keyValuePair = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return keyValuePair;
    });

    return array;
}

/**
 * Sätt upp glosförhöret efter att en fil med glosor laddats. 
 */
function setUp() {
    currentQuestionIndex = 0;
    setQuestion();
}

/**
 * Sätt upp en ny fråga.
 */
function setQuestion() {
    result.innerText = "";
    currentQuestion = questions[currentQuestionIndex];
    question.innerText = currentQuestion[questionHeader];
}

/**
 * Rätta svaret.
 */
function checkAnswer() {
    const correctAnswer = currentQuestion[answerHeader];

    if (userAnswer.value == correctAnswer) {
        result.innerText = "Rätt!";
    } else {
        result.innerText = "Fel, rätt svar är: " + correctAnswer;
    }
}

/**
 * Gå till föregående fråga.
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }

    setQuestion();
}

/**
 * Gå till nästa fråga.
 */
function nextQuestion() {
    if (currentQuestionIndex < (questions.length - 1)) {
        currentQuestionIndex++;
    }

    setQuestion();
}