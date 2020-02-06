const userModule = (() => {
    const domElements = {
        // indicators - test control
        timeLeft, //HTML element displaying time left
        //test result
        wpm, wpmChange, cpm, cpmChange, accuracy, accuracyChange,
        //user input
        textInput, nameInput,
        //test words
        content, activeWord,
        //modal
        modal
    };
    return {
        // get DOM Elements
        getDOMElements: () => { },
        //indicators - test control
        updateTimeLeft: () => { },
        //results
        updateResults: () => { },
        fillModal: () => { },
        showModal: () => { },
        // user input
        inputFocus: () => { },
        isNameEmpty: () => { },
        flagNameInput: () => { },
        spacePressed: () => { },
        enterPressed: () => { },
        emptyInput: () => { },
        getTypeWord: () => { },

        //test words
        fillContent: () => { },
        formatWord: (wordObject, wordHTML) => { },
        setActiveWord: (index) => { },
        deactivateCurrentWord: () => { },
        scroll: () => { }
    }
})()