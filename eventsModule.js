const eventsModule = ((dataM, userM, certificateM, wordsM) => {
    const addEventListeners = function () {

        // enter click event
        userM.getDOMElements().textInput.addEventListener("keydown", event => {
            // console.log(event);

            // if the test ended, do nothing
            if (dataM.testEnded()) {
                return;
            }

            // check if the user press enter
            let key = event.keyCode;
            if (key == 13) {
                userM.getDOMElements().textInput.value += dataM.getLineReturn() + " ";

                // create a new "input" event
                let inputEvent = new Event('input');

                //dispatch it
                userM.getDOMElements().textInput.dispatchEvent(inputEvent);

            }
        })

        // character typing event listener
        userM.getDOMElements().textInput.addEventListener("input", event => {
            // console.log(event);
            // if the test ended, do nothing
            if (dataM.testEnded()) {
                return;
            }

            // if the test has not started yet, start the test and countdown
            if (!dataM.testStarted()) {
                // start the test: dataM
                dataM.startTest();

                // start counter
                const b = setInterval(() => {
                    // calculate the results: dataM

                    let results = {};

                    //    update upm, upmChange
                    [results.wpm, results.wpmChange] =
                        dataM.calculateWpm();

                    //    update cpm, cpmChange
                    [results.cpm, results.cpmChange] =
                        dataM.calculateCpm();

                    //    update accuracy, accuracyChange
                    [results.accuracy, results.accuracyChange] =
                        dataM.calculateAccuracy();


                    dataM.returnData();


                    // update/show results userM
                    userM.updateResults(results);

                    // NO

                    // check if we have time left
                    if (dataM.timeLeft()) {
                        //    reduce time by one sec: dataM
                        let timeLeft = dataM.reduceTime();

                        //    update time remaining in userM
                        userM.updateTimeLeft(timeLeft);
                    } else {
                        //end the test: dataM
                        clearInterval(b);
                        dataM.endTest();

                        // fill modal
                        userM.fillModal(results.wpm);

                        // show modal
                        userM.showModal();
                    }

                }, 1000);
            }

            // get typed word: UI module
            let typedWord = userM.getTypeWord();

            // update current word: data module
            dataM.updateCurrentWord(typedWord);

            // format active word 
            let currentWord = dataM.getCurrentWord();
            userM.formatWord(currentWord);

            // check if the user pressed space or enter
            if (userM.spacePressed(event) || userM.enterPressed(dataM.getLineReturn())) {
                // console.log("space pressed")
                // empty text input
                userM.emptyInput();

                // deactivate current word
                userM.deactivateCurrentWord();

                // move to a new word: data module
                dataM.moveToNewWord();

                // set active word: UI module 
                let index = dataM.getCurrentWordIndex();
                userM.setActiveWord(index);

                // format the active word: UI module
                let currentWord = dataM.getCurrentWord();
                userM.formatWord(currentWord);

                // scroll word into the middle view
                userM.scroll();
            }
        })
        // click on download button event listener
        userM.getDOMElements().download.addEventListener('click', () => {
            if (userM.isNameEmpty()) {
                userM.flagNameInput();
            } else {
                let certificateData = dataM.getCertificateData();
                certificateM.generateCertificate(certificateData);
            }
        })
    };

    // scroll active word into middle view on window resize
    window.addEventListener("resize", userM.scroll);


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
