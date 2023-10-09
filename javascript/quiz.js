const questions = [
    {
        question: "Who is often referred to as the 'father of the computer' due to his development of the mechanical analytical engine, an early concept of a programmable computer?",
        optionA: "Gordon Moore",
        optionB: "Charles Babbage",
        optionC: "William Shockley",
        optionD: "Steve Jobs",
        correctOption: "optionB"
    },

    {
        question: "What programming language, designed in 1957, was the first high-level programming language and primarily used for scientific and engineering calculations?",
        optionA: "LISP",
        optionB: "COBOL",
        optionC: "Fortran",
        optionD: "C",
        correctOption: "optionC"
    },

    {
        question: "In what year was JavaScript, the primary language for front-end web development, first introduced?",
        optionA: "1984",
        optionB: "1995",
        optionC: "2004",
        optionD: "2014",
        correctOption: "optionB"
    },

    {
        question: "Which co-founder of Intel is known for coining 'Moore's Law,' which predicts the regular doubling of computer power?",
        optionA: "Charles Babbage",
        optionB: "Larry Page",
        optionC: "Gordon Moore",
        optionD: "Mark Zuckerberg",
        correctOption: "optionC"
    },

    {
        question: "What notable event in 1975 marked the beginning of Silicon Valley as a hub for technology and innovation?",
        optionA: "Launch of the Macintosh",
        optionB: "The Altair 8800 is released",
        optionC: "Founding of Google",
        optionD: "Launch of Windows 95",
        correctOption: "optionB"
    },

    {
        question: "Who are the co-founders of Google, the world's most widely used search engine?",
        optionA: "Steve Jobs and Steve Wozniak",
        optionB: "Larry Page and Sergey Brin",
        optionC: "Bill Gates and Paul Allen",
        optionD: "Chad Hurley, Steve Chen, and Jawed Karim",
        correctOption: "optionB"
    },

    {
        question: "What language, known for its simplicity and efficiency, is suitable for concurrent and networked systems and was developed by Google?",
        optionA: "Ruby",
        optionB: "Python",
        optionC: "Go (Golang)",
        optionD: "TypeScript",
        correctOption: "optionC"
    },

    {
        question: "What social media platform, founded in 2004, has changed the way people worldwide communicate and share information?",
        optionA: "Twitter",
        optionB: "Facebook",
        optionC: "YouTube",
        optionD: "WhatsApp",
        correctOption: "optionB"
    },

    {
        question: "Who is the creator of the Linux operating system, one of the most influential open-source projects in computer science?",
        optionA: "Linus Torvalds",
        optionB: "Bill Gates",
        optionC: "Steve Jobs",
        optionD: "Mark Zuckerberg",
        correctOption: "optionA"
    },

    {
        question: "In what year was the iPhone first presented to the public?",
        optionA: "1992",
        optionB: "2000",
        optionC: "2007",
        optionD: "2010",
        correctOption: "optionC"
    }


]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= questions.length - 1) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 500)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 500)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= questions.length - 1) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 500);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    const totalQuestions = questions.length;
    const percentage = (playerScore / totalQuestions) * 100;
    
    if (percentage <= 30) {
        remark = "Maybe read the website again";
        remarkColor = "red";
    }
    else if (percentage > 30 && percentage <= 60) {
        remark = "You are have clearly read the website";
        remarkColor = "orange";
    }
    else if (percentage > 60) {
        remark = "Excellent, You know this already.";
        remarkColor = "green";
    }
    const playerGrade = percentage;

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}