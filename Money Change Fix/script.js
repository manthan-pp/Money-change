let data = [];
let selectedRowIndex = -1;

function addItem() {
  const currency = document.getElementById("currencyInput").value;
  const quantity = document.getElementById("quantityInput").value;

  if (Number(currency) === 0 || Number(quantity) === 0) {
    return alert("Incorrect Input!!");
  }

  const dataTable = document.getElementById("table");

  if (selectedRowIndex === -1) {
    let newRow = dataTable.insertRow();
    let currencyCell = newRow.insertCell(0);
    let quantityCell = newRow.insertCell(1);
    let editCell = newRow.insertCell(2);
    let deleteCell = newRow.insertCell(3);

    currencyCell.innerHTML = currency;
    quantityCell.innerHTML = quantity;

    editCell.innerHTML = `<button class="edit" onclick="editEntry(event);">Edit</button>`;
    deleteCell.innerHTML = `<button class="delete" onclick="deleteEntry(event)">Delete</button>`;
  } else {
    dataTable.rows[selectedRowIndex].cells[0].innerHTML = currency;
    dataTable.rows[selectedRowIndex].cells[1].innerHTML = quantity;
    selectedRowIndex = -1;
    document.getElementsByTagName("button")[0].innerText = "Add";
  }

  document.getElementById("currencyInput").value = "";
  document.getElementById("quantityInput").value = "";
}

function editEntry(e) {
  let rowIndex = e.target.parentElement.parentElement.rowIndex;
  const dataTable = document.getElementById("table");
  const currencyInput = document.getElementById("currencyInput");
  const quantityInput = document.getElementById("quantityInput");

  selectedRowIndex = rowIndex;

  currencyInput.value = dataTable.rows[rowIndex].cells[0].innerHTML;
  quantityInput.value = dataTable.rows[rowIndex].cells[1].innerHTML;

  document.getElementsByTagName("button")[0].innerText = "Update";
}

function deleteEntry(e) {
  let rowIndex = e.target.parentElement.parentElement.rowIndex;
  const dataTable = document.getElementById("table");
  dataTable.deleteRow(rowIndex);
}


// const btn = document.getElementById("btn-add");
// btn.addEventListener("click",addItem);