const data = (() => {
    // private
    const appData = {
        indicators: {
            testStarted: false,
            testEnded: false,
            totalTestTime: 0,
            timeLeft: 0
        },
        results: {
            wpm: 0,
            wpmChange: 0,
            cpm: 0,
            cpmChange: 0,
            accuracy: 0,
            accuracyChange: 0,
            numOfCorrectWords: 0,
            numOfCorrectCharacters: 0,
            numOfTestCharacters: 0
        },
        words: {
            currentWordIndex: 0,
            testWords: [],
            currentWord: {
                value: {
                    correct: "",
                    user: "",
                    isCorrect: false
                },
                characters: {
                    correct: [],
                    user: [],
                    totalCorrect: 0,
                    totalTest: 0
                }
            }
        }
    };


    //const word = function () { } //class word constructor 
    //word.prototype.update = function (value) { } // update method

    class Word {
        constructor(index) { }
        update(value) { }// update method
    }

    //public
    return {
        setTestTime: (x) => { }, //set the total test time to x
        initializeTimeLeft: () => { }, //initializes time left to the total test
        startTest: () => { }, //start the test
        endTest: () => { }, //ends the test
        reduceTime: () => { },// reduces time by one sec
        timeLeft: () => { },//checks if there is time left to continue the test
        testEnded: () => { },//check if the test has already ended
        testStarted: () => { },//check if the test has started
        getTimeLeft: () => { },

        // results

        calculateWpm: () => { }, //calculates wpm and wpmChange and updates them in appData 
        calculateCpm: () => { }, //calculates cpm and cpmChange and updates them in appData 
        calculateAccuracy: () => { }, //calculates accuracy and accuracyChange and updates them in appData

        // test words
        fillListOfTestWords: (textNumber) => { }, //fills words, testWords
        getListOfTestWords: () => { }, //get list of test words  words.testWords
        moveToNewWord: () => { }, // update current word by creating a new instance of the word class
        updateCurrentWord: () => { } //update current word using user input
    }

})();