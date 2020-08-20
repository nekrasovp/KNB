let userScore = 0;
let compScore = 0;

const userScoreSpan = document.getElementById("user_score");
const compScoreSpan = document.getElementById("comp_score");

const scoreBoardDiv = document.querySelector(".score-board")
const result_pDiv = document.querySelector(".result > p")

const kDiv = document.getElementById("k");
const nDiv = document.getElementById("n");
const bDiv = document.getElementById("b");

const resultTable = document.getElementById('result-table');

const conv = {
    'b':'Бумага',
    'k':'Камень',
    'n':'Ножницы'
};

const bg_selector = {
    'Победа': 'green_row_bg',
    'Ничья': 'gray_row_bg',
    'Поражение': 'red_row_bg',
}

function getRandomChoice() {
    const choices = ['k', 'n', 'b'];
    const rnd = Math.floor(Math.random() * 3);
    return choices[rnd];
}

function addResultTableLog(c1, c2, result) {
    var row = resultTable.insertRow(1);
    row.classList.add(bg_selector[result]);
    var cell0 = row.insertCell();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    cell0.innerHTML = new Date().toJSON().slice(11,19)
    cell1.innerHTML = conv[c1];
    cell2.innerHTML = conv[c2];
    cell3.innerHTML = result;
}

function win(choice1, choice2) {
    userScore++;
    const userChoiceDiv = document.getElementById(choice1)
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    result_pDiv.innerHTML = `${conv[choice1]} > ${conv[choice2]}. Вы победили!`;
    addResultTableLog(choice1, choice2, 'Победа');
    userChoiceDiv.classList.add('green-glow');
    setTimeout(() => userChoiceDiv.classList.remove('green-glow'), 300);
}

function draw(choice1, choice2) {
    const userChoiceDiv = document.getElementById(choice1)
    result_pDiv.innerHTML = `${conv[choice1]} = ${conv[choice2]}. Ничья!`;
    addResultTableLog(choice1, choice2, 'Ничья');
    userChoiceDiv.classList.add('gray-glow');
    setTimeout(() => userChoiceDiv.classList.remove('gray-glow'), 300);
}

function loose(choice1, choice2) {
    compScore++
    const userChoiceDiv = document.getElementById(choice1)
    userScoreSpan.innerHTML = userScore;
    compScoreSpan.innerHTML = compScore;
    result_pDiv.innerHTML = `${conv[choice2]} > ${conv[choice1]}. Вы проиграли!`;
    addResultTableLog(choice1, choice2, 'Поражение');
    userChoiceDiv.classList.add('red-glow');
    setTimeout(() => userChoiceDiv.classList.remove('red-glow'), 300);
}

function decide(choice1, choice2) {
    switch (choice1 + choice2) {
        case "bb":
            draw(choice1, choice2);
            break;
        case "bk":
            win(choice1, choice2);
            break;
        case "bn":
            loose(choice1, choice2);
            break;
        case "kk":
            draw(choice1, choice2);
            break;
        case "kb":
            loose(choice1, choice2);
            break;
        case "kn":
            win(choice1, choice2);
            break;
        case "nn":
            draw(choice1, choice2);
            break;
        case "nb":
            win(choice1, choice2);
            break;
        case "nk":
            loose(choice1, choice2);
            break;
    }
}

function play_game(userChoice) {
    const compChoice = getRandomChoice();
    decide(userChoice, compChoice);
}

function main() {
    // Define listeners for icons
    kDiv.addEventListener('click', () => play_game('k'));
    nDiv.addEventListener('click', () => play_game('n'));
    bDiv.addEventListener('click', () => play_game('b'));
}

main();
