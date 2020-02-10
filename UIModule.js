const UIModule = (() => {

    const DOMElements = {
        //indicators - test control
        timeLeft: document.getElementById('timeLeft'), //HTML element displaying time left
        //test results
        wpm: document.getElementById('wpm'),
        wpmChange: document.getElementById('wpmChange'),
        cpm: document.getElementById('cpm'),
        cpmChange: document.getElementById('cpmChange'),
        accuracy: document.getElementById('accuracy'),
        accuracyChange: document.getElementById('accuracyChange'),
        //user input
        textInput: document.querySelector('#input'),
        nameInput: document.querySelector('.form-group'),
        nameField: document.getElementById('name'),
        //test words
        content: document.getElementById('content'),
        activeWord: '',
        //modal
        modal: $('#myModal'),
        download: document.getElementById('download')
    };
    const splitArray = string => {
        return string.split("");
    };
    const addSpace = array => {
        array.push(" ");
        return array;
    };
    const addSpanTags = array => {
        return array.map(currentCharacter => {
            return `<span>${currentCharacter}</span>`;
        })
    };
    const addWordSpanTags = array => {
        array.push("</span>");
        array.unshift("<span>");
        return array;

    };
    const joinEachWord = array => {
        return array.join("")
    };



    return {
        // get DOM Elements
        getDOMElements: () => { },
        //indicators - test control
        updateTimeLeft: (x) => {
            DOMElements.timeLeft.innerHTML = x;

        },
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
        fillContent: (array, lineReturn) => {
            //['word1,', 'word2'];
            let content = array.map(splitArray);
            // [["w", "o", "r","d", "1", ","], ["w", "o", "r","d", "2"]];
            content = content.map(addSpace);
            // [["w", "o", "r","d", "1", ",", "  "], ["w", "o", "r","d", "2", " "]]
            content = content.map(addSpanTags);
            //[['<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>', '<span> </span>'], ['<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span> </span>']];
            content = content.map(addWordSpanTags);
            //[['<span>','<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span>,</span>', '<span> </span>', '</span>'], ['<span>','<span>w</span>', '<span>o</span>', '<span>r</span>', '<span>d</span>', '<span>1</span>', '<span> </span>', '</span>']]
            content = content.map(joinEachWord);
            content = content.join('');
            // console.log(content);
            // <span><span>w</span><span>o</span><span>r</span><span>d</span><span>1</span><span>,</span><span> </span></span><span><span>w</span><span>o</span><span>r</span><span>d</span><span>2</span><span> </span></span>;

            //replace the line return special code with the HTML entity (line return)

            // <span>|</span>
            // <span>&crarr;</span>
            //            content = content.replace('<span>|</span>', '<span>&crarr;</span>');
            //split, join
            content = content.split('<span>' + lineReturn + '</span>').join('<span>&crarr;</span>');

            // fill content

            DOMElements.content.innerHTML = content;
        },
        formatWord: (wordObject, wordHTML) => { },
        setActiveWord: (index) => { },
        deactivateCurrentWord: () => { },
        scroll: () => { }
    }
})();

