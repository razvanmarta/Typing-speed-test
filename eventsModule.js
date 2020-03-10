const eventsModule = ((dataM, userM, certificateM, wordsM) => {
    const addEventListeners = function () {
        // character typing event listener
        userM.getDOMElements().textInput.addEventListener("input", (event) => {
            // if the test ended, do nothing
            if (dataM.testEnded()) {
                return;
            }

            // if the test has not started yet, start the test and countdown
            if (!dataM.testStarted()) {
                // start the test
            }

            // get typed word: UI module
            let typedWord = userM.getTypeWord();

            // update current word: data module
            dataM.updateCurrentWord(typedWord);

            // format active word 
            let currentWord = dataM.getCurrentWord();
            userM.formatWord(currentWord);

            // check if the user pressed space or enter
            if (userM.spacePressed() || userM.enterPressed()) {
                // empty text input

                // deactivate current word

                // move to a new word: data module

                // set active word: UI module 

                // format the active word: UI module

                // scroll word into the middle view
            }
        })
        // click on download button event listener
        // click on restart button event listener
    };


    // public
    return {
        // init function, initializes the test before start
        init: (duration, textNumber) => {

            // fill the list of test words: data
            let word = wordsM.getWords(textNumber);
            dataM.fillListOfTestWords(textNumber, word);

            // fill the list of words: UIModule
            let lineReturn = dataM.getLineReturn();
            const testWords = dataM.getListOfTestWords();
            userM.fillContent(testWords, lineReturn);

            // set te total test time:data Module
            dataM.setTestTime(duration);

            // update time left: data Module
            dataM.initializeTimeLeft();

            // update time left: user
            let timeLeft = dataM.getTimeLeft();
            UIModule.updateTimeLeft(timeLeft);

            // move to a new word: dataM
            dataM.moveToNewWord();

            // set active word: user
            let index = dataM.getCurrentWordIndex();
            userM.setActiveWord(index);

            // format the active word: userM
            let currentWord = dataM.getCurrentWord();
            userM.formatWord(currentWord);


            // focus on text input: user
            userM.inputFocus();


            // add event listener
            addEventListeners();
        }
    };

})(dataModule, UIModule, certificateModule, wordsModule);
