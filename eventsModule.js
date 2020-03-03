const eventsModule = ((dataM, userM, certificateM, wordsM) => {
    const addEventListeners = function () {
        // private
        // character typing event listener
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
