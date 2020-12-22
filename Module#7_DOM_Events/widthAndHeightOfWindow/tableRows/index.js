// Table rows
// Write a program to manage table of two columns. User should be able to add/delete rows and insert text inside cells:

// To add new row user clicks on “Add row” button
// To delete - button with “bin icon“
// To edit cell text user double clicks on particular cell. After that:

// Input field appears instead of text
// Text which was in cell pasted into input
// Focus applied on input
// Press Enter key - input field is hidden and text is added into the cell

const table = document.querySelector('.table');
const tableBody = document.querySelector('.table-body');
const addRowBtn = document.querySelector('.add-btn');

addRowBtn.addEventListener('click', (event) => {
  const newRow = tableBody.insertRow();
  let numberOfCellsInRow = table.rows[0].cells.length;
  let cells = '<td></td>'.repeat(numberOfCellsInRow) + 
  '<td class="delete-cell"><button class="delete-btn"><img class="delete-icon" src="./assets/img/delete.png" alt="delete icon"></button></td>';

  newRow.innerHTML = cells;
})

table.addEventListener('click', deleteRow);

table.addEventListener('dblclick', replaceElementByInput);

function replaceElementByInput(event) {
  if ((event.target.tagName === 'TD' || event.target.tagName === 'TH') && !event.target.classList.contains('delete-cell')) {
    let input = document.createElement('input');
    input.value = event.target.textContent;
    input.style.width = `${event.target.offsetWidth - 25}px`;

    event.target.innerHTML = ``;
    event.target.appendChild(input);

    input.focus();

    
    input.addEventListener('keyup', function (e) {
      console.log( e.target);
      if (e.key === 'Enter') {
        event.target.textContent = e.target.value;
        table.removeEventListener('dblclick', replaceElementByInput)
      }
    })

    
    input.addEventListener('blur', function (ev) {
      event.target.textContent = ev.target.value;
      table.removeEventListener('dblclick', replaceElementByInput)
    })
  }

 
}

document.addEventListener('click', function () {
  table.addEventListener('dblclick', replaceElementByInput);
})

function deleteRow(event) {
  if (event.target.classList.contains('delete-icon')) {
    table.deleteRow(event.target.closest('tr').rowIndex);
  }
}