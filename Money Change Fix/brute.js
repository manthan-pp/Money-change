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

    editCell.innerHTML = `<button class="edit" onclick="editEntry(${newRow.rowIndex});">Edit</button>`;
    deleteCell.innerHTML = `<button class="delete" onclick="deleteEntry(${newRow.rowIndex})">Delete</button>`;
  } else {
    dataTable.rows[selectedRowIndex].cells[0].innerHTML = currency;
    dataTable.rows[selectedRowIndex].cells[1].innerHTML = quantity;
    selectedRowIndex = -1;
    document.getElementsByTagName("button")[0].innerText = "Add";
  }

  document.getElementById("currencyInput").value = "";
  document.getElementById("quantityInput").value = "";
}

function editEntry(rowIndex) {
  const dataTable = document.getElementById("table");
  const currencyInput = document.getElementById("currencyInput");
  const quantityInput = document.getElementById("quantityInput");

  selectedRowIndex = rowIndex;

  currencyInput.value = dataTable.rows[rowIndex].cells[0].innerHTML;
  quantityInput.value = dataTable.rows[rowIndex].cells[1].innerHTML;

  document.getElementsByTagName("button")[0].innerText = "Update";
}

function deleteEntry(rowIndex) {
  const dataTable = document.getElementById("table");
  dataTable.deleteRow(rowIndex);
}

function calculateChange() {
  const totalAmount = document.getElementById("totalAmount").value.trim();
  const givenAmount = document.getElementById("givenAmount").value.trim();

  if (parseInt(givenAmount) < parseInt(totalAmount)) {
    alert("Insufficient given amount provide more money.");
  } else if (givenAmount === "" || totalAmount === "") {
    alert("Please enter both total and given amounts.");
  } else {
    let table = document.getElementById("table");
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    // rows = Array.from(table.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));

    
      let result = bruteForce(rows, parseInt(givenAmount) - parseInt(totalAmount));
      document.getElementById("c-value").innerHTML = "Return Amount Change: " +
        (parseInt(givenAmount) - parseInt(totalAmount));
      document.getElementById("changeResult").innerText = result.join("\n");
 
  }
}

function bruteForce(rows, change) {
  let result = [];

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    let currency = parseInt(cells[0].innerText);
    let quantity = parseInt(cells[1].innerText);

    for (let k = 1; k <= quantity; k++) {
      if (k * currency <= change) {
        result.push(k + " x " + currency);
        change -= k * currency;

        let updatedQuantity = quantity - k;
        cells[1].innerText = updatedQuantity;

        if (updatedQuantity <= 0) {
          table.deleteRow(i);
          i--;
          alert("Inefficient quantity of " + currency + " currency.");
        }

        break;
      }
    }
  }

  return result;
}