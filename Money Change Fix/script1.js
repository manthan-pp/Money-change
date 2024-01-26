function calculateChange() {
  const totalAmount = document.getElementById("totalAmount").value.trim();
  const givenAmount = document.getElementById("givenAmount").value.trim();

  if (parseInt(givenAmount) < parseInt(totalAmount)) {
    alert("Insufficient given amount! Please provide more money.");
  } else if (givenAmount === "" || totalAmount === "") {
    alert("Please enter both total and given amounts.");
  } else {
    let table = document.getElementById("table");
    let rows = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    
    let result = dynamicProgramming(
      rows,
      parseInt(givenAmount) - parseInt(totalAmount)
    );

    //   let updatedQuantity = quantity - currencyChange;
    //   cells[1].innerText = updatedQuantity;

    // // Remove the row if the quantity zero
    // if (updatedQuantity <= 0) {
    //   table.deleteRow(i);
    //   i--;
    //   alert("Inefficient quantity of " +currency+ " currency.");
    // }
    
    document.getElementById("c-value").innerHTML =
      "Return Amount Change: " +
      (parseInt(givenAmount) - parseInt(totalAmount));
    document.getElementById("changeResult").innerText = result.join("\n");
  }
}

function dynamicProgramming(rows, change) {
  let dp = new Array(change + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= change; i++) {
    for (let j = 1; j < rows.length; j++) {
      let cells = rows[j].getElementsByTagName("td");
      let currency = parseInt(cells[0].innerText);
      let quantity = parseInt(cells[1].innerText);

      for (let k = 1; k <= quantity && k * currency <= i; k++) {
        dp[i] = Math.min(dp[i], dp[i - k * currency] + k);
      }
    }
  }

  let result = [];
  let remainingChange = change;

  for (let i = rows.length - 1; i >= 1; i--) {
    let cells = rows[i].getElementsByTagName("td");
    let currency = parseInt(cells[0].innerText);
    let quantity = parseInt(cells[1].innerText);

    for (let k = quantity; k >= 0; k--) {
      if (
        k * currency <= remainingChange &&
        dp[remainingChange - k * currency] + k === dp[remainingChange]
      ) {
        result.push(k + " x " + currency);
        remainingChange -= k * currency;

        let updatedQuantity = quantity - k;
        cells[1].innerText = updatedQuantity;

        if (updatedQuantity <= 0) {
          table.deleteRow(i);
          i--;
          alert("Inefficient quantity of " + currency + " currency.");
        }
       
        break;
      }

      // Remove the row if the quantity zero
    }
    // let updatedQuantity = quantity - remainingChange;
    // cells[1].innerText = updatedQuantity;
    // if (updatedQuantity <= 0) {
    //   table.deleteRow(i);
    //   i--;
    //   alert("Inefficient quantity of " + currency + " currency.");
    // }
  }

  return result;
}