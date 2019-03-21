// Script for displaying errors during typing test using mutationObservers
// Issues: After completing a test displays 1 word error due to the Result board cotaining
// a span with class="wrong"
// Fix/Feature: Adding error tracking to each word, in such a way that will display
// the wrong letter above the correct letter in the word.
// After this implementation, make the class names of wrong words different from
// the Results board.

function reloadBoxAction(mutationRecord) {
    mutationRecord.forEach((m)=>{
        if (m.attributeName === 'style'){
            wordsObj.resetCount();
        }
    });
}

function wordsAction(mutationRecord) {
    mutationRecord.forEach((m)=>{
        if (m.attributeName === 'class')
        wordsObj.updateLabel();
    })
}

let wordsObj = {
    row: document.getElementById('row1'),
    label: document.getElementsByClassName('control-label')[0],
    errors: document.getElementsByClassName('wrong'),
    errorCount: 0,
    options: {
        attributes: true,
        subtree: true
    },
    getErrorCount() {
        return this.errors.length;
    },
    updateLabel() {
        this.errorCount = this.getErrorCount();
        this.label.innerHTML = `You have <span style="color:red;font-size: 3em;">${this.errorCount}</span> errors`;
    },
    resetCount() {
        this.errorCount = 0;
    }
}

let reloadBox = {
    element: document.getElementById('reload-box'),
    options: {
        attributes: true
    }
}

const reloadBoxObserver = new MutationObserver(reloadBoxAction);
const wordsObserver = new MutationObserver(wordsAction);

reloadBoxObserver.observe(reloadBox.element, reloadBox.options);
wordsObserver.observe(wordsObj.row, wordsObj.options);


