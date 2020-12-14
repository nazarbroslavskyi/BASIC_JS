// Searching by word in text
// Write a program that will search and highlight entered text in a given paragraph.
// You should use < input >, <textarea>, <p> and <b> tags.
// User should be able to put any text in <textarea>,
// then text will be immediately displayed in <p>.
// After that when user starts typing any text in <input> field,
// program should highlight search string from <input>
// field in paragraph <p> by using <b> tag.

const textArea = document.querySelector('.container__textarea');
const paragraph = document.querySelector('.container__text');
const inputField = document.querySelector('.container__input');

textArea.addEventListener('input', function () {
  paragraph.innerHTML = textArea.value;
  highlightText()
});

inputField.addEventListener('input', () => highlightText());

function highlightText() {
  let searchExpr = new RegExp(inputField.value, 'g');
  paragraph.innerHTML = paragraph.textContent.replace(
    searchExpr,
    `<b>${inputField.value}</b>`);
}