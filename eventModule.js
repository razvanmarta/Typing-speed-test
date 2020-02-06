const eventsModule = ((dt, us, ctf, wds) => {
    const addEventListeners = function () {
        // private
        // character typing event listener
        // click on download button event listener
        // click on restart button event listener

        // public
        // init function, initializes the test before start
        init: (duration, textNumber) => {
            // fill the list of test words: data
            let words = wds.getWords(textNumber)
            dt.fillListOfTestWords(textNumber, words);



            // fill the list of words: user


            // set te total test time


            // update time left: data


            // update time left: user


            // move to a new word: data

            // set active word: user


            // format the active word: user


            // focus on text input: user

            // add event listener
            addEventListeners();
        }
    }
}
)(data, userModule, certificate, wordsModule);