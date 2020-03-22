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

    const updateChange = (value, changeElement) => {

        //determine the class to add to the change element and html content to insert
        let classToAdd, html;
        [classToAdd, html] = (value >= 0) ? ['scoreUp', '+' + value] : ['scoreDown', value];

        //add % to the percentage change
        if (changeElement === DOMElements.accuracyChange) {
            html += '%';
        }

        //update the change element
        changeElement.innerHTML = html;

        //style the change element
        changeElement.removeAttribute('class');
        changeElement.className = classToAdd;

        //fade element
        fadeElement(changeElement);
    };

    const fadeElement = function (element) {
        element.style.opacity = 1;
        setTimeout(function () {
            element.style.opacity = 0.8;
        }, 100);
    };



    return {
        // get DOM Elements
        getDOMElements: () => {
            return {
                textInput: DOMElements.textInput,
                download: DOMElements.download
            }
        },
        //indicators - test control
        updateTimeLeft: x => {
            DOMElements.timeLeft.innerHTML = x;

        },
        //results
        updateResults: results => {
            //update wpm
            DOMElements.wpm.innerHTML = results.wpm;
            //update cpm
            DOMElements.cpm.innerHTML = results.cpm;
            //update accuracy
            DOMElements.accuracy.innerHTML = results.accuracy + '%';
            //update changes
            updateChange(results.wpmChange, DOMElements.wpmChange);
            updateChange(results.cpmChange, DOMElements.cpmChange);
            updateChange(results.accuracyChange, DOMElements.accuracyChange);
        },

        fillModal: wpm => {
            let results;
            if (wpm < 40) {
                results = {
                    type: 'turtle',
                    image: 'turtle.jpg',
                    level: 'Beginner'
                };
            } else if (wpm < 70) {
                results = {
                    type: 'horse',
                    image: 'horse.jpg',
                    level: 'Average'
                };
            } else {
                results = {
                    type: 'puma',
                    image: 'puma.jpg',
                    level: 'Expert'
                };
            }
            let html = '<div class="result"><p>You are a %type%!</p><p>You type at a speed of %wpm% words per minute!</p><img width="300" height="200" src="images/%image%" class= "rounded-circle" alt=%alt%></div>';
            html = html.replace('%type%', results.type);
            html = html.replace('%wpm%', wpm);
            html = html.replace('%image%', results.image);
            html = html.replace('%alt%', results.type);

            //insert html before form-group
            DOMElements.nameInput.insertAdjacentHTML('beforebegin', html);

            //store level in download button
            DOMElements.download.setAttribute('level', results.level);
        },

        showModal: () => {
            DOMElements.modal.modal('show');
        },

        // user input
        inputFocus: () => {
            DOMElements.textInput.focus();
        },

        isNameEmpty: () => {
            return DOMElements.nameField.value === '';
        },

        flagNameInput: () => {
            DOMElements.nameField.style.borderColor = 'red';
        },

        spacePressed: event => {
            return event.data == " ";
        },

        enterPressed: lineReturn => {
            return DOMElements.textInput.value.includes(lineReturn + ' ');
        },

        emptyInput: () => {
            DOMElements.textInput.value = "";
        },

        getTypeWord: () => {
            // console.log(DOMElements.textInput.value)
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

