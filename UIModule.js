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

    let userValue;

    const returnCharClass = (correctCharacter, index) => {
        return (index < userValue.length) ? (correctCharacter === userValue[index] ? 'correctCharacter' : 'wrongCharacter') : '0'
    };



    return {
        // get DOM Elements
        getDOMElements: () => {
            return {
                textInput: DOMElements.textInput
            }
        },
        //indicators - test control
        updateTimeLeft: (x) => {
            DOMElements.timeLeft.innerHTML = x;

        },
        //results
        updateResults: () => { },

        fillModal: () => { },

        showModal: () => { },

        // user input
        inputFocus: () => {
            DOMElements.textInput.focus();
        },

        isNameEmpty: () => { },

        flagNameInput: () => { },

        spacePressed: (event) => {
            return event.data == " ";
        },

        enterPressed: () => { },

        emptyInput: () => {
            DOMElements.textInput.value = "";
        },

        getTypeWord: () => {
            return DOMElements.textInput.value;
        },

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

            //replace the line return special code with the HTML entity (line return) ----<span>|</span>----><span>&crarr;</span>----> content = content.replace('<span>|</span>', '<span>&crarr;</span>');
            //split, join
            content = content.split('<span>' + lineReturn + '</span>').join('<span>&crarr;</span>');

            // fill content
            DOMElements.content.innerHTML = content;
        },

        formatWord: wordObject => {
            let activeWord = DOMElements.activeWord;

            // highlight current word
            activeWord.className = "activeWord";

            // format individual characters
            let correctValue = wordObject.value.correct;
            userValue = wordObject.value.user;

            //  correct value vs user value

            let classes = Array.prototype.map.call(correctValue, returnCharClass);

            // HTML collection
            let characters = activeWord.children;

            // add classes to children
            for (let i = 0; i < characters.length; i++) {
                characters[i].removeAttribute('class');
                characters[i].className = classes[i];
            }



        },

        setActiveWord: (index) => {
            DOMElements.activeWord = DOMElements.content.children[index];
        },


        deactivateCurrentWord: () => {
            DOMElements.activeWord.removeAttribute('class')
        },

        scroll: () => {
            let activeWord = DOMElements.activeWord;
            let top1 = activeWord.offsetTop;
            let top2 = DOMElements.content.offsetTop;
            let diff = top1 - top2;
            // scroll the content of the content box
            DOMElements.content.scrollTop = diff - 40;

        }
    }
})();

