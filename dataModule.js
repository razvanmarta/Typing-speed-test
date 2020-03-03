const dataModule = (() => {
    // private

    const lineReturn = "|";

    //  shuffle function

    const shuffle = (array) => {
        let newArray = [];
        let randomIndex;
        let randomElement;
        while (array.length > 0) {
            // take a random element from array and add it to newArray
            let randomIndex = Math.floor(Math.random() * array.length);
            let randomElement = array[randomIndex];
            newArray.push(randomElement);
            // delete randomElement from array
            array.splice(randomIndex, 1);
        }
        return newArray;
    };

    // capitalize first letter of a string

    String.prototype.capitalize = function () {
        let newString = "";
        let firstCharacterCapitalize = this.charAt(0).toUpperCase();
        let remainingChar = this.slice(1);
        newString = firstCharacterCapitalize + remainingChar;
        return newString;
    };

    // capitalizeRandom function

    const capitalizeRandom = function (arrayOfStrings) {
        return arrayOfStrings.map(function (currentWord) {
            let x = Math.floor(4 * Math.random()); //chances of x equal to 3: 25%;
            return (x === 3) ? currentWord.capitalize() : currentWord;
        })
    };


    // addRandomPunctuation function

    const addRandomPunctuation = function (arrayOfStrings) {
        return arrayOfStrings.map(
            function (currentWord) {
                let randomPunctuation;
                const punctuation = [lineReturn, "?", "!", "!", ",", ".", ".", ".", ".", ".", " ", " ", " ", " ", " ", " ", " "];
                let index = Math.floor(Math.random() * punctuation.length);
                randomPunctuation = punctuation[index];

                return currentWord + randomPunctuation;
            }
        )
    }




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
            currentWordIndex: -1,
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

    class Word {
        constructor(index) {
            //  word values: correct vs user's
            this.value = {
                correct: appData.words.testWords[index] + " ",
                user: '',
                isCorrect: false
            },
                // characters : correct vs user's value 
                this.characters = {
                    correct: this.value.correct.split(''),
                    user: [],
                    totalCorrect: 0,
                    totalTest: this.value.correct.length
                };
        }
        update(value) { }// update method
    }

    //public
    return {
        //set the total test time to x
        setTestTime: (x) => {
            appData.indicators.totalTestTime = x;
        },

        //initializes time left to the total test
        initializeTimeLeft: () => {
            appData.indicators.timeLeft = appData.indicators.totalTestTime;
        },
        startTest: () => { }, //start the test
        endTest: () => { }, //ends the test
        reduceTime: () => { },// reduces time by one sec
        timeLeft: () => { },//checks if there is time left to continue the test
        testEnded: () => { },//check if the test has already ended
        testStarted: () => { },//check if the test has started
        getTimeLeft: () => {
            return appData.indicators.timeLeft;
        },

        // results

        calculateWpm: () => { }, //calculates wpm and wpmChange and updates them in appData 
        calculateCpm: () => { }, //calculates cpm and cpmChange and updates them in appData 
        calculateAccuracy: () => { }, //calculates accuracy and accuracyChange and updates them in appData

        // TEST WORDS

        //fills words, testWords
        fillListOfTestWords: function (textNumber, words) {
            let result = words.split(" ");
            if (textNumber === 0) {
                // shuffle words
                result = shuffle(result);
                // capitalize random strings
                result = capitalizeRandom(result);
                // add a random punctuation
                result = addRandomPunctuation(result)
            }
            appData.words.testWords = result;
        },

        //get list of test words  words.testWords
        getListOfTestWords: () => {
            return appData.words.testWords;
        },

        // increment the currentWordIndex
        // update current word by creating a new instance of the word class
        // update the current word (appData.words.currentWord) by creating a new instance of the WORD class
        // update numOfCorrectWords, numOfCorrectCharacter and numOfTestCharacters
        moveToNewWord: () => {
            if (appData.words.currentWordIndex > -1) {
                //update the number of correct words 

                //update the number of correct characters

                // update number of test characters
            }
            appData.words.currentWordIndex++;
            const currentIndex = appData.words.currentWordIndex;
            const newWord = new Word(currentIndex);
            appData.words.currentWord = newWord;
        },

        // get the current word index
        getCurrentWordIndex: () => {
            let index = appData.words.currentWordIndex;
            return index;
        },

        // get the current word 
        getCurrentWord() {
            let currentWord = appData.words.currentWord;
            return {
                value: {
                    correct: currentWord.value.correct,
                    user: currentWord.value.user
                }
            }
        },

        //update current word using user input
        updateCurrentWord: () => { },
        getLineReturn() {
            return lineReturn;
        },

        // only for test
        returnData() {
            console.log(appData);
        }
    }
})();








